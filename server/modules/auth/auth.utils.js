const bcrypt = require("bcryptjs");

const hashPassword = async (plainPassword, round = 12) =>
  bcrypt.hash(plainPassword, round);

const getOTP = () => Math.floor(100000 + Math.random() * 900000);

module.exports = { hashPassword, getOTP };
