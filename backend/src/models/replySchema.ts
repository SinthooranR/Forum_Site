const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  paragraph: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  reply: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Reply",
    },
  ],
});

export default mongoose.model("Reply", replySchema);
