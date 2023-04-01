"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("auth_tokens", {
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
        allowNull: false,
        field: "expires_at",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("auth_tokens");
  },
};
