/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
