const Validator = require("./baseValidator");
const { isAlphanumeric, isEmail } = require("validator").default;

class AdminLoginValidator extends Validator {
  constructor(username, password) {
    super();

    this.username = username;
    this.password = password;
  }

  _validateUsername() {
    let username = this.username;
    username = this.normalizeInput(username);

    if (isAlphanumeric(username, "en-US", { ignore: " " }) || isEmail(username)) {
      this.validateRequired(username, "username");
    } else {
      this._errors["username"] = "Invalid username format";
    }
  }

  validate() {
    this._validateUsername();
    this.validatePassword(this.password);

    return this.getErrors();
  }
}

module.exports = AdminLoginValidator;
