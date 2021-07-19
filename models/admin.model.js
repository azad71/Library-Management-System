const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
    },

    imageUrl: {
      type: String,
      default: "profile.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
