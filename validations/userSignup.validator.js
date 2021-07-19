const Validator = require("./baseValidator");

class UserSignupValidator extends Validator {
  constructor(firstname, lastname, username, email, password, confirmPassword) {
    super();

    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  _validateName(name, label, min = 3, max = 20) {
    name = this.normalizeInput(name);

    this.validateAlpha(name, label);
    this.validateMinLength(name, label, min);
    this.validateMaxLength(name, label, max);
    this.validateRequired(name, label);
  }

  _validateGender() {
    let allowedGenders = ["male", "female", "others"];
    this.validateIsIn(this.gender, allowedGenders, "gender");
  }

  _validateAddress() {
    let address = this.address;
    address = this.normalizeInput(address);

    this.validateAlphanumeric(address, "address");
  }

  validate() {
    this._validateName(this.firstname, "firstname");
    this._validateName(this.lastname, "lastname");
    this.validateUsername(this.username);
    this.validateEmail(this.email);
    // this._validateGender();
    // this._validateAddress();
    this.validateNewPassword(this.password, this.confirmPassword);

    return this.getErrors();
  }
}

module.exports = UserSignupValidator;
