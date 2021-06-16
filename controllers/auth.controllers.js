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

exports.postUserLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

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

// exports.postUserSignUp = async (req, res, next) => {
//   try {
//     let { firstName, lastName, username, email, gender, address, password } = req.body;

//     let isExists = await User.find({
//       $or: [{ email: username }, { username }],
//     });

//     if (isExists) {
//       req.flash("warning", "User with this credential already exists");
//       return res.redirect("back");
//     }

//     password = await bcrypt.hash(password, 12);

//     let newUser = new User({ firstName, lastName, username, email, gender, address, password });

//     newUser = await newUser.save();

//     req.session.isAuthenticated = true;
//     delete user.password;
//     req.session.user = {
//       ...user,
//       isAdmin: false,
//     };

//     return res.redirect("/");
//   } catch (err) {
//     console.log(err);
//     return res.render("user/userSignup");
//   }
// };
