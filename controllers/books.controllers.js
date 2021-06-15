const Book = require("../models/book.model");
const PER_PAGE = 16;

exports.getBooks = async (req, res, next) => {
  let { q = "", page = 1, limit = 24 } = req.query;

  try {
    let books, count;
    // Fetch books from database
    if (q !== "") {
      books = await Book.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .skip(limit * page - limit)
        .limit(+limit)
        // .sort({ createdAt: "-1" });
        .sort({ score: { $meta: "textScore" } });
      console.log("inside first block------", books);

      count = await Book.find({ $text: { $search: q } }).countDocuments();
    } else {
      books = await Book.find()
        .skip(limit * page - limit)
        .limit(+limit);

      console.log("inside second block---------", books);
      count = await Book.find().countDocuments();
    }

    let booksCountByCategory = await Book.aggregate([
      { $group: { _id: { category: "$category" }, count: { $sum: 1 } } },
    ]).replaceRoot({ category: { $concat: ["$_id.category"] }, count: "$count" });

    let booksCountByAuthors = await Book.aggregate([
      { $group: { _id: { author: "$author" }, count: { $sum: 1 } } },
    ]).replaceRoot({ authorName: { $concat: ["$_id.author"] }, count: "$count" });

    res.render("books", {
      books: books,
      current: page,
      pages: Math.ceil(count / limit),
      user: req.session.user,
      limit,
      q,
      categories: booksCountByCategory,
      authors: booksCountByAuthors,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book_id = req.params.book_id;
    const book = await Book.findById(book_id);
    // .populate("comments");
    res.render("user/bookDetails", { book: book });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
