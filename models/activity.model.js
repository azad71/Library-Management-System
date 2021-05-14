const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activityType: {
      type: String,
      required: [true, "Activity type is required"],
    },

    description: {
      type: String,
      required: [true, "Activity Description is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reference: {
      id: String,
      modelName: String,
    },
  },
  { timestamps: true }
);

// const activitySchema = new mongoose.Schema({
//   bookInfo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book",
//   },

//   category: {
//     type: String,
//   },

//   time: {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Issue",
//     },
//     returnDate: Date,
//     issueDate: Date,
//   },

//   user_id: {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     username: String,
//   },

//   fine: {
//     amount: Number,
//     date: Date,
//   },

//   entryTime: {
//     type: Date,
//     default: Date.now(),
//   },
// });

module.exports = mongoose.model("Activity", activitySchema);
