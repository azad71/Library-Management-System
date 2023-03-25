const CustomerError = require("./customError");

class NotFoundError extends CustomerError {
  statusCode = 404;

  constructor() {
    super("Requested resources not found");
  }

  serializeErrors() {
    return [{ message: "Requested resources not found" }];
  }
}

module.exports = NotFoundError;
