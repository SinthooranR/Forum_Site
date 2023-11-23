import { model, Schema } from "mongoose";
import { IPost } from "./interfaces/interfaces";

const postSchema: Schema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Reply",
    },
  ],
});

export default model<IPost>("Post", postSchema);
