const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      unique: [true, "User name already exists"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },

    password: {
      type: String,
      min: [6, "Password should be at least 6 characters"],
    },

    imageUrl: {
      type: String,
      default: "profile.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
