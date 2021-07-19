const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
    },

    author: {
      type: String,
      required: [true, "Book author name is required"],
    },

    ISBN: {
      type: String,
      required: [true, "Book ISBN number is required"],
      unique: [true, "ISBN number must be unique"],
    },

    category: {
      type: String,
      required: [true, "Book category is required"],
    },

    stock: {
      type: Number,
      required: [true, "Book category is required"],
    },

    returnDate: { type: Date, default: Date.now() + 7 * 24 * 60 * 60 * 1000 },

    isRenewed: { type: Boolean, default: false },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
