const express = require("express"),
  router = express.Router();

// Import index controller
const authController = require("../controllers/auth.controllers");

// Import models
const User = require("../models/user.model");

router.post("/admin/signup", authController.postAdminSignUp);

router.post("/admin/login", authController.postAdminLogin);

router.post("/user/signup", authController.postUserSignUp);

router.post("/user/login", authController.postUserLogin);

module.exports = router;
