const Book = require("../models/book.model");
const config = require("../config");

exports.getLandingPage = (req, res) => {
  return res.render("landing");
};
