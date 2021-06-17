const Validator = require("./baseValidator");
const config = require("../config");

class AdminSignupValidator extends Validator {
  constructor(username, email, password, confirmPassword, adminCode) {
    super();

    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.adminCode = adminCode;
  }

  _validateAdminCode() {
    let adminCode = this.adminCode;
    adminCode = this.normalizeInput(adminCode);

    this.validateAlpha(adminCode, "adminCode");
    this.validateRequired(adminCode, "adminCode");
  }

  validate() {
    this.validateUsername(this.username);
    this.validateEmail(this.email);
    this.validateNewPassword(this.password, this.confirmPassword);
    this._validateAdminCode();

    return this.getErrors();
  }
}

module.exports = AdminSignupValidator;
