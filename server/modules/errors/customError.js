class CustomerError extends Error {
  statusCode;

  constructor(message = "Something went wrong") {
    super(message);

    if (this.constructor === CustomerError) {
      throw new Error("CustomError class can not be instantiated");
    }
  }

  serializeErrors() {
    throw new Error("serializeErrors must be implemented");
  }
}

module.exports = CustomerError;
