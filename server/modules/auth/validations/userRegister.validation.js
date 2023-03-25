const { body } = require("express-validator");
const userRegisterValidation = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 256 })
    .withMessage("Name must be between 2 to 256 characters"),
  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Address is required")
    .bail()
    .isLength({ max: 256 })
    .withMessage("Address must not exceeds more than 256 characters"),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email, please provide a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 48 })
    .withMessage("Password must be between 6 to 48 characters"),
];

module.exports = userRegisterValidation;
