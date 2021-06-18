const express = require("express"),
  router = express.Router();

// Importing controller
const bookController = require("../controllers/books.controllers");

// Browse books
router.get("/", bookController.getBooks);

// Get books count by category
router.get("/count/categories", bookController.getBooksCountByCategory);

// Get books count by authors
router.get("/count/authors", bookController.getBooksCountByAuthors);

// Fetch individual book details
router.get("/:book_id", bookController.getBookById);

module.exports = router;
