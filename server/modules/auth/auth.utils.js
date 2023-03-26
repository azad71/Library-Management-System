const bcrypt = require("bcryptjs");
const hashPassword = async (plainPassword, round = 12) =>
  bcrypt.hash(plainPassword, round);

module.exports = { hashPassword };
