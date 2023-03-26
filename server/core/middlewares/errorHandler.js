const CustomerError = require("../../modules/errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomerError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  let message = "Something went wrong";
  if (err?.message) message = err.message;

  res.status(400).send({
    errors: { message },
  });
};

module.exports = errorHandler;
