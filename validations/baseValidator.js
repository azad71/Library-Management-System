const { isEmpty, isEmail, isAlphanumeric, isAlpha, escape } = require("validator").default;

class Validator {
  _errors = {};

  _checkOpts(opts) {
    return Object.keys(opts).length ? true : false;
  }

  _isEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      value === NaN ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }

  normalizeInput(value) {
    let val = value;
    val = !this._isEmpty(value) ? value : "";
    // val = escape(val.trim());
    return val;
  }

  validateRequired(value, label) {
    if (isEmpty(value)) {
      this._errors[label] = `${label} is required`;
    }
  }

  validateMinLength(value, label, min = 3) {
    if (value.length < min) {
      this._errors[label] = `${label} must have at least ${min} characters`;
    }
  }

  validateMaxLength(value, label, max = 100) {
    if (value.length > max) {
      this._errors[label] = `${label} can have maximum ${max} characters`;
    }
  }

  validateAlphanumeric(value, label) {
    if (!isAlphanumeric(value, "en-US", { ignore: " " })) {
      this._errors[label] = "Only alphanumeric value is allowed";
    }
  }

  validateAlpha(value, label) {
    if (!isAlpha(value)) {
      this._errors[label] = `Only a-z and A-Z characters are allowed for ${label}`;
    }
  }

  validateEqual(value1, value2, label) {
    if (value1 !== value2) {
      this._errors[label] = `${label} doesn't match`;
    }
  }

  _isEmail(value) {
    value = this.normalizeInput(value);
    if (!isEmail(value)) {
      this._errors["email"] = "Invalid email format";
    }
  }

  validateUsername(value, min = 3, max = 30) {
    let username = value;
    username = this.normalizeInput(username);
    this.validateAlphanumeric(username, "username");
    this.validateMinLength(username, "username", min);
    this.validateMaxLength(username, "username", max);
    this.validateRequired(username, "username");
  }

  validatePassword(value, min = 6, max = 100) {
    let password = value;
    password = this.normalizeInput(password);

    this.validateMinLength(password, "password", min);
    this.validateMaxLength(password, "password", max);
    this.validateRequired(password, "password");
  }

  validateNewPassword(password, confirmPassword, min = 6, max = 100) {
    password = this.normalizeInput(password);
    confirmPassword = this.normalizeInput(confirmPassword);

    this.validateEqual(password, confirmPassword, "password");
    this.validateMinLength(password, "password", min);
    this.validateMaxLength(password, "password", max);
    this.validateRequired(password, "password");
  }

  validateEmail(value) {
    let email = value;
    email = this.normalizeInput(email);
    this._isEmail(email);
    this.validateRequired(email, "email");
  }

  validateIsIn(value, valueArray, label) {
    if (!Array.isArray(valueArray)) {
      this._errors[label] = `${label} choices is not an array`;
      return;
    }

    value = this.normalizeInput(value);

    if (!valueArray.includes(value)) {
      this._errors[label] = `Invalid ${label} value`;
    }
  }

  sanitize(values) {
    if (!this._checkOpts(values)) {
      return false;
    }

    let data = {};
    Object.keys(values).forEach((key) => (data[key] = escape(this.normalizeInput(values[key]))));

    return data;
  }

  getErrors() {
    let errors = this._errors;

    return {
      isValid: this._isEmpty(errors),
      errors,
    };
  }
}

module.exports = Validator;
