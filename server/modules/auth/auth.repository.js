const AuthToken = require("./models/authToken");
const User = require("./models/users");

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const createUser = async (payload) => {
  return User.create(payload);
};

const addAuthTokenInfo = async (payload) => {
  return AuthToken.create(payload);
};

module.exports = { findUserByEmail, createUser, addAuthTokenInfo };
