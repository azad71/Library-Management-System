const express = require("express");

const app = express();

app.use(express.json({ limit: "100kb" }));

module.exports = app;
