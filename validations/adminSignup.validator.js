const Validator = require("./baseValidator");

class AdminSignupValidator extends Validator {
  constructor(username, email, password, confirmPassword) {
    super();

    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  _validateAdminUsername() {
    let username = this.username;
    username = this.normalizeInput(username);
    this.validateAlphanumeric(username, "username");
    this.validateMinLength(username, "username", 3);
    this.validateMaxLength(username, "username", 10);
    this.validateRequired(username, "username");
  }

  _validateAdminEmail() {
    let email = this.email;
    email = this.normalizeInput(email);
    this.validateEmail(email);
    this.validateRequired(email, "email");
  }

  _validateAdminPassword() {
    let password = this.password;
    let confirmPassword = this.confirmPassword;

    password = this.normalizeInput(password);
    confirmPassword = this.normalizeInput(confirmPassword);

    this.validateEqual(password, confirmPassword, "password");
    this.validateMinLength(password, "password", 6);
    this.validateMaxLength(password, "password", 100);
    this.validateRequired(password, "password");
  }

  validate() {
    this._validateAdminUsername();
    this._validateAdminEmail();
    this._validateAdminPassword();

    let errors = this._errors;

    return {
      isValid: this._isEmpty(errors),
      errors,
    };
  }
}

module.exports = AdminSignupValidator;
