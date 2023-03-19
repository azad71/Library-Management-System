const { validationResult } = require("express-validator");
const RequestValidationError = require("../../modules/errors/requestValidationError");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

module.exports = validateRequest;
