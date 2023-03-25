const router = require("express").Router();
const validateRequest = require("../../core/middlewares/validateRequest");
const { userRegister } = require("./auth.controller");
const userRegisterValidation = require("./validations/userRegister.validation");

router.post(
  "/user/register",
  userRegisterValidation,
  validateRequest,
  userRegister,
);

module.exports = router;
