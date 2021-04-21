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
  author: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Reply",
    },
  ],
});

export default mongoose.model("Post", postSchema);
