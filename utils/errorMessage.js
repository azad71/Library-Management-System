function errorMessage(statusCode, errors, res) {
  return res.status(statusCode).json({
    status: false,
    errors,
  });
}

module.exports = errorMessage;
