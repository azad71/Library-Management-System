const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// Import index controller
const authController = require("../controllers/auth.controllers");

// Import models
const User = require("../models/user.model");

router.post("/admin/signup", authController.postAdminSignUp);

router.post("/admin/login", authController.postAdminLogin);

// //user login handler
// router.get("/auth/user-login", authController.getUserLoginPage);

// router.post("/auth/user-login", authController.postUserLogin);

// //user -> user logout handler
// router.get("/auth/user-logout", authController.getUserLogout);

// //user sign up handler
// router.get("/auth/user-signUp", authController.getUserSignUp);

// router.post("/auth/user-signup", authController.postUserSignUp);

module.exports = router;
