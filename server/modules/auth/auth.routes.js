const router = require("express").Router();
const { register } = require("./auth.controller");

router.post("/register", register);

module.exports = router;
