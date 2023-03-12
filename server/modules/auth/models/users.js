const Sequelize = require("sequelize");
const sequelize = require("../../../core/database");

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name",
    },
    email: {
      type: Sequelize.STRING,
      field: "email",
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "password",
    },
    userStatus: {
      type: Sequelize.ENUM("active", "inactive", "pending", "banned"),
      defaultValue: "pending",
      field: "user_status",
    },
    profilePicture: {
      type: Sequelize.STRING,
      field: "profile_picture",
      defaultValue: "profile.png",
    },
    address: {
      type: Sequelize.STRING,
      defaultValue: "",
      field: "address",
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "last_login",
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

module.exports = User;
