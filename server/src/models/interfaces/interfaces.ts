import { Document } from "mongoose";

export interface IUser extends Document {
  _doc: any | null;
  name: string;
  username: string;
  password: string;
  posts: [IPost] | null;
  replies: [IReply] | null;
}

export interface IReply extends Document {
  postID: IPost["_id"];
  userID: IUser["_id"];
  paragraph: string;
}

export interface IPost extends Document {
  userID: IUser["_id"];
  title: string;
  paragraph: string;
  replies: [IReply] | null;
}
