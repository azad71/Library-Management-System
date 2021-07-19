const mongoose = require("mongoose");

// TODO user and admin has common field, should be packed in one class

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },

    lastname: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      trim: true,
      unique: [true, "username is already exists"],
    },

    email: {
      type: String,
      trim: true,
      unique: [true, "email already exists"],
    },

    password: {
      type: String,
    },

    bookIssueInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],

    gender: {
      type: String,
    },

    address: {
      type: String,
    },

    imageUrl: {
      type: String,
      default: "profile.png",
    },

    violationFlag: { type: Boolean, default: false },

    fines: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
