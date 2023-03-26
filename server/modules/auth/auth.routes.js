const router = require("express").Router();
const validateRequest = require("../../core/middlewares/validateRequest");
const authController = require("./auth.controller");
const userRegisterValidation = require("./validations/userRegister.validation");

router.post(
  "/user/register",
  userRegisterValidation,
  validateRequest,
  authController.registerUser,
);

module.exports = router;
