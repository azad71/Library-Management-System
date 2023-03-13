const express = require("express");
const routes = require("./core/routes");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/api/v1", routes);

module.exports = app;
