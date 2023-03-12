require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 60,
    min: 0,
    idle: 10000,
    acquire: 60000,
  },
});

module.exports = sequelize;
