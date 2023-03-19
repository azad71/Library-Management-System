import CustomerError from "./customError";

class RequestValidationError extends CustomerError {
  statusCode = 400;

  constructor(errors) {
    super("Invalid request parameters");
    this.errors = errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    let errorPayload = [];
    this.errors.forEach((err) => {
      errorPayload.push({ [err.param]: err.msg });
      errorPayload[err.param] = err.msg;
    });

    return errorPayload;
  }
}

module.exports = RequestValidationError;
