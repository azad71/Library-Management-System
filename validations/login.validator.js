const Validator = require("./baseValidator");

class AdminLoginValidator extends Validator {
  constructor(username, password) {
    super();

    this.username = username;
    this.password = password;
  }

  _validateUsername() {
    let username = this.username;
    username = this.normalizeInput(username);
    this.validateRequired(username, "username");
  }

  _validateUserPassword() {
    let password = this.password;
    password = this.normalizeInput(password);

    this.validateMinLength(password, "password", 6);
    this.validateMaxLength(password, "password", 100);
    this.validateRequired(password, "password");
  }

  validate() {
    this._validateUsername();
    this._validateUserPassword();

    let errors = this._errors;

    return {
      isValid: this._isEmpty(errors),
      errors,
    };
  }
}

module.exports = AdminLoginValidator;
