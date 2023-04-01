const Sequelize = require("sequelize");
const sequelize = require("../../../core/database");

const { Model } = Sequelize;

class AuthToken extends Model {}

AuthToken.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      field: "email",
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "token",
    },
    userType: {
      type: Sequelize.ENUM("user", "admin"),
      field: "user_type",
    },
    reason: {
      type: Sequelize.ENUM("signup", "password_reset", "resend_token"),
      field: "reason",
    },
    retryCount: {
      type: Sequelize.INTEGER,
      field: "retry_count",
      defaultValue: 0,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "updated_at",
    },
    expiresAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "expires_at",
    },
  },
  {
    sequelize,
    modelName: "auth_tokens",
    freezeTableName: true,
    timestamps: true,
  },
);

module.exports = AuthToken;
