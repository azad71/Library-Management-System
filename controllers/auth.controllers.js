const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import config
const config = require("../config");

// importing models
const User = require("../models/user.model");
const Admin = require("../models/admin.model");

// utils

// validation
const AdminSignupValidator = require("../validations/adminSignup.validator");
const LoginValidator = require("../validations/login.validator");
const UserSignupValidator = require("../validations/userSignup.validator");

exports.postAdminSignUp = async (req, res) => {
  try {
    let { username, email, password, confirmPassword, adminCode } = req.fields;

    let adminValidator = new AdminSignupValidator(username, email, password, confirmPassword, adminCode);

    let { isValid, errors } = adminValidator.validate();

    if (!isValid) {
      return res.status(400).json({
        status: false,
        errors,
      });
    }

    const isExists = await Admin.findOne({
      $or: [{ email: username }, { username }],
    });

    if (isExists) {
      return res.status(400).json({
        status: false,
        errors: "Admin with this credential already exists",
      });
    }

    password = await bcrypt.hash(password, 12);

    let newAdmin = new Admin({ email, username, password });

    newAdmin = await newAdmin.save();

    return res.json({
      status: true,
      message: "Admin signed up successfully, Please login to continue",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong",
    });
  }
};

exports.postAdminLogin = async (req, res) => {
  try {
    let { username, password } = req.fields;

    const adminValidator = new LoginValidator(username, password);
    const { isValid, errors } = adminValidator.validate();

    if (!isValid) {
      return res.status(400).json({
        status: false,
        errors,
      });
    }

    const admin = await Admin.findOne({
      $or: [{ email: username }, { username }],
    }).lean();

    if (!admin) {
      return res.status(404).json({
        status: false,
        errors: "No admin found with this credentials",
      });
    }

    // sign jwt token
    delete admin.password;
    const token = `Bearer ${jwt.sign(admin, config.JWT_SECRET, { expiresIn: "1d" })}`;

    return res.json({
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong",
    });
  }
};

exports.postUserLogin = async (req, res) => {
  try {
    const { username, password } = req.fields;

    const userValidator = new LoginValidator(username, password);
    const { isValid, errors } = userValidator.validate();

    if (!isValid)
      return res.status(400).json({
        status: false,
        errors,
      });

    let user = await User.findOne({
      $or: [{ email: username }, { username }],
    }).lean();

    if (!user) {
      return res.status(404).json({
        status: false,
        errors: "No user found with this credential",
      });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(401).json({
        status: false,
        errors: "Unauthorized access",
      });
    }

    // sign jwt token
    delete user.password;
    const token = `Bearer ${jwt.sign(user, config.JWT_SECRET, { expiresIn: "1d" })}`;

    return res.json({
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong",
    });
  }
};

exports.postUserSignUp = async (req, res, next) => {
  try {
    let { firstname, lastname, username, email, gender, address, password, confirmPassword } = req.fields;

    const userValidator = new UserSignupValidator(firstname, lastname, username, email, password, confirmPassword);

    const { isValid, errors } = userValidator.validate();

    if (!isValid)
      return res.status(400).json({
        status: false,
        errors,
      });

    let data = userValidator.sanitize({ firstname, lastname, username, email, gender, address });

    let isExists = await User.findOne({
      $or: [{ email: data.username }, { username: data.username }],
    });

    if (isExists)
      return res.status(409).json({
        status: false,
        errors: "User with this credential already exists",
      });

    password = await bcrypt.hash(password, 12);
    data["password"] = password;

    let newUser = new User(data);

    newUser = await newUser.save();

    return res.json({
      status: true,
      message: "User signed up successfully, Please login to continue",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong",
    });
  }
};
