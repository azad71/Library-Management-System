const mongoose = require("mongoose");

// TODO user and admin has common field, should be packed in one class

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name can't be empty"],
      min: [3, "First name must have at least 3 characters"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name can't be empty"],
      min: [3, "Last name must have at least 3 characters"],
      trim: true,
    },

    username: {
      type: String,
      required: [true, "username can't be empty"],
      min: [5, "username must have at least 5 characters"],
      trim: true,
      unique: [true, "username is already exists"],
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "email already exists"],
    },

    password: {
      type: String,
      min: [6, "Password should be at least 6 characters"],
    },

    bookIssueInfo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],

    gender: {
      type: String,
      enum: ["male", "female", "others"],
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
