require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    pool: {
      max: 60,
      min: 0,
      idle: 10000,
      acquire: 60000,
    },
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    pool: {
      max: 60,
      min: 0,
      idle: 10000,
      acquire: 60000,
    },
  },
};
