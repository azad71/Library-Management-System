const express = require("express"),
  router = express.Router();

// Importing controller
const bookController = require("../controllers/books.controllers");

// Browse books
router.get("/", bookController.getBooks);

// Fetch individual book details
router.get("/:book_id", bookController.getBookById);

module.exports = router;
