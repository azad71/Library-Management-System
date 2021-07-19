const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pendingSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["issued", "pending"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pending", pendingSchema);
