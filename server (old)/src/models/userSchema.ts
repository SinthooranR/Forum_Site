import { model, Schema } from "mongoose";
import { IUser } from "./interfaces/interfaces";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String, //gets URL not a actual file
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId, //helps mongo determine the id
      required: true,
      ref: "Post", //connects current scheme with another Schema
    },
  ],
  replies: [
    {
      type: Schema.Types.ObjectId, //helps mongo determine the id
      required: true,
      ref: "Reply", //connects current scheme with another Schema
    },
  ],
});
// exports with the correct collection and schema using mongoose
export default model<IUser>("User", userSchema);
