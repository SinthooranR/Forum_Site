const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  reply: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
