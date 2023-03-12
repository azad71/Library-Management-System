require("dotenv").config();

const app = require("./app");
const sequelize = require("./core/database");

sequelize.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running");
});
