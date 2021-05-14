const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: [3, "Title must have at least three characters"],
      required: [true, "Title is required"],
      trim: true,
    },

    ISBN: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN must be unique"],
      trim: true,
    },

    stock: {
      type: Number,
      min: [1, "Stock can't be empty"],
    },

    author: {
      type: String,
      required: [true, "Book must have author"],
    },

    description: {
      type: String,
      min: [10, "Please provide a short description of at least 10 characters"],
    },

    category: {
      type: String,
      min: [1, "Comment can't be empty"],
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps }
);

module.exports = mongoose.model("Book", bookSchema);
