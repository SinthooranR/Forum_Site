import { model, Schema } from "mongoose";
import { IReply } from "./interfaces/interfaces";

const replySchema: Schema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  userID: {
    type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Reply",
    },
  ],
});

export default model<IReply>("Reply", replySchema);
