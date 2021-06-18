const Book = require("../models/book.model");

exports.getBooks = async (req, res) => {
  let { q = "", page = 1, limit = 24 } = req.query;

  try {
    let books, count;
    // Fetch books from database
    if (q !== "") {
      books = await Book.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .select("-searchTitle -__v")
        .skip(limit * page - limit)
        .limit(+limit)
        // .sort({ createdAt: "-1" });
        .sort({ score: { $meta: "textScore" } });

      count = await Book.find({ $text: { $search: q } }).countDocuments();
    } else {
      books = await Book.find()
        .select("-searchTitle -__v")
        .skip(limit * page - limit)
        .limit(+limit);

      count = await Book.find().countDocuments();
    }

    return res.json({
      books,
      current: page,
      pages: Math.ceil(count / limit),
      limit,
      q,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong!",
    });
  }
};

exports.getBooksCountByCategory = async (req, res) => {
  try {
    let categoryCounts = await Book.aggregate([
      { $group: { _id: { category: "$category" }, count: { $sum: 1 } } },
    ]).replaceRoot({
      category: { $concat: ["$_id.category"] },
      count: "$count",
    });

    return res.json({
      status: true,
      categoryCounts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong!",
    });
  }
};

exports.getBooksCountByAuthors = async (req, res) => {
  try {
    let authorCounts = await Book.aggregate([
      { $group: { _id: { author: "$author" }, count: { $sum: 1 } } },
    ]).replaceRoot({ authorName: { $concat: ["$_id.author"] }, count: "$count" });

    return res.json({
      status: true,
      authorCounts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong!",
    });
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { book_id = "" } = req.params;
    const book = await Book.findById(book_id);
    // .populate("comments");

    return res.json({
      status: true,
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      errors: "Something went wrong!",
    });
  }
};
