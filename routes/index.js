const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import models
const User = require("../models/user");

//landing page
router.get("/", (req, res) => {
  res.render("landing");
});

//admin login handler
router.get("/adminLogin", (req, res) => {
  res.render("admin/adminLogin");
});

router.post(
  "/adminLogin",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/adminLogin",
  }),
  (req, res) => {}
);

//admin logout handler
router.get("/adminLogout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// sign up
router.get("/adminSignup", (req, res) => {
  res.render("signup");
});

router.post("/adminSignup", (req, res) => {
  if (req.body.adminCode == "Open Sesame") {
    const newAdmin = new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: true,
    });

    User.register(newAdmin, req.body.password, (err, user) => {
      if (err) {
        req.flash(
          "error",
          "Given info matches someone registered as User. Please provide different info for registering as Admin"
        );
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, function () {
        req.flash(
          "success",
          "Hello, " + user.username + " Welcome to Admin Dashboard"
        );
        res.redirect("/admin");
      });
    });
  } else {
    req.flash("error", "Secret word doesn't match!");
    return res.redirect("back");
  }
});

//user login handler
router.get("/userLogin", (req, res) => {
  res.render("user/userLogin");
});

router.post(
  "/userLogin",
  passport.authenticate("local", {
    successRedirect: "/user/1",
    failureRedirect: "/userLogin",
  }),
  (req, res) => {}
);

//user -> user logout handler
router.get("/userLogout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//user sign up handler
router.get("/signUp", (req, res) => {
  res.render("user/userSignup");
});

router.post("/signUp", (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.render("user/userSignup");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/user/1");
    });
  });
});

module.exports = router;
