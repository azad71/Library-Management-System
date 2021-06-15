const bcrypt = require("bcryptjs");

// import config
const config = require("../config");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// importing models
const User = require("../models/user.model");
const Admin = require("../models/activity.model");

exports.getAdminLoginPage = (req, res) => {
  res.render("admin/adminLogin");
};

exports.getAdminLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

exports.getAdminSignUp = (req, res, next) => {
  res.render("signup");
};

exports.postAdminSignUp = async (req, res, next) => {
  try {
    let { adminCode = "" } = req.body;
    if (adminCode === config.ADMIN_SECRET) {
      let { username, email, password, confirmPassword } = req.body;

      const isExists = await Admin.findOne({
        $or: [{ email: username }, { username }],
      });

      if (isExists) {
        req.flash("warning", "Admin with this credential already exists");
        return res.redirect("back");
      }

      password = await bcrypt.hash(password, 12);

      let newAdmin = new Admin({ username, email, password, isAdmin: true });

      newAdmin = await newAdmin.save();

      req.session.isAuthenticated = true;
      req.session.user = {
        _id: newAdmin._id,
        username: newAdmin.username,
        isAdmin: true,
      };

      req.flash("success", `Hello ${username}, Welcome to Admin Dashboard`);
      return res.redirect("/admin/dashboard");
    } else {
      req.flash("error", "Unauthorized access!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Something went wrong!");
    console.log(err);
    return res.redirect("back");
  }
};

exports.getUserLoginPage = (req, res, next) => {
  res.render("user/userLogin");
};

exports.getUserLogout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

exports.getUserSignUp = (req, res, next) => {
  res.render("user/userSignup");
};

exports.postUserLogin = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    // TODO login input validation

    let user = await User.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!user) {
      req.flash("error", "No user found with this credential");
      return res.redirect("back");
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      req.flash("error", "There is an imposter among us!");
      return res.redirect("back");
    }

    req.session.isAuthenticated = true;
    delete user.password;
    req.session.user = {
      ...user,
      isAdmin: false,
    };

    return res.redirect("/user/1");
  } catch (error) {
    console.log(error);
    req.flash("error", "Oops! Something went wrong!");
    return res.redirect("back");
  }
};

exports.postUserSignUp = async (req, res, next) => {
  try {
    let { firstName, lastName, username, email, gender, address, password } = req.body;

    let isExists = await User.find({
      $or: [{ email: username }, { username }],
    });

    if (isExists) {
      req.flash("warning", "User with this credential already exists");
      return res.redirect("back");
    }

    password = await bcrypt.hash(password, 12);

    let newUser = new User({ firstName, lastName, username, email, gender, address, password });

    newUser = await newUser.save();

    req.session.isAuthenticated = true;
    delete user.password;
    req.session.user = {
      ...user,
      isAdmin: false,
    };

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("user/userSignup");
  }
};
