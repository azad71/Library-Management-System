const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      min: [1, "Comment can't be empty"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
