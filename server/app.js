const express = require("express");
const errorHandler = require("./core/middlewares/errorHandler");
const routes = require("./core/routes");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/api/v1", routes);

app.use(errorHandler);

module.exports = app;
