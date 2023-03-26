const User = require("./models/users");

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const createUser = async (payload) => {
  return User.create(payload);
};

module.exports = { findUserByEmail, createUser };
