const CustomerError = require("./customError");

class RequestValidationError extends CustomerError {
  statusCode = 400;

  constructor(errors) {
    super("Invalid request parameters");
    this.errors = errors;
  }

  serializeErrors() {
    let errorPayload = {};
    this.errors.forEach((err) => {
      errorPayload[err.param] = err.msg;
    });

    return errorPayload;
  }
}

module.exports = RequestValidationError;
