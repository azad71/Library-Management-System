const { isEmpty, isEmail, isAlphanumeric } = require("validator").default;

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
    return !this._isEmpty(value) ? value : "";
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
    if (!isAlphanumeric(value)) {
      this._errors[label] = "Only alphanumeric value is allowed";
    }
  }

  validateEqual(value1, value2, label) {
    if (value1 !== value2) {
      this._errors[label] = `${label} doesn't match`;
    }
  }

  validateEmail(value) {
    value = this.normalizeInput(value);
    if (!isEmail(value)) {
      this._errors["email"] = "Invalid email format";
    }
  }

  // validateSecretCode(value, secretCode) {
  //   if (value !== secretCode) {
  //     this._errors["secretCode"] = "Secret does not match";
  //   }
  // }

  getErrors() {
    return this._errors;
  }
}

module.exports = Validator;
