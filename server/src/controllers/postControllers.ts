import PostSchema from "../models/postSchema";
import UserSchema from "../models/userSchema";
import ReplySchema from "../models/replySchema";
import HttpError from "../models/errorHandleModel";

import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { IPost, IReply, IUser } from "../models/interfaces/interfaces";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, paragraph, author, userID } = req.body;

  let validateError = validationResult(req);

  if (!validateError.isEmpty()) {
    res.status(422).json({ errors: validateError.array() });
  } else {
    let newPost = new PostSchema({
      title,
      paragraph,
      userID,
      author,
      replies: [],
    });

    let user: IUser | null;

    try {
      user = await UserSchema.findById(userID);
    } catch (err) {
      const error = new HttpError("Cannot find this user's ID", 500);
      return next(error);
    }

    try {
      await newPost.save(); //saves the newPost in its Collection
      if (user && user.posts) {
        user.posts.push(newPost); //adds the data into the users post array storage
        await user.save(); //updates the users data
      }
    } catch (err) {
      const error = new HttpError("Failed to create the Post", 500);
      return next(error);
    }

    res.status(201).json({ post: newPost });
  }
};

export const createReply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { paragraph, postID, userID, author } = req.body;

  let validateError = validationResult(req);

  if (!validateError.isEmpty()) {
    res.status(422).json({ errors: validateError.array() });
  } else {
    let newReply = new ReplySchema({
      paragraph,
      postID,
      userID,
      author,
      replies: [],
    });

    let post: IPost | null;
    let user: IUser | null;

    try {
      post = await PostSchema.findById(postID);
      user = await UserSchema.findById(userID);
    } catch (err) {
      const error = new HttpError(
        "Cannot find either the Post ID or the User ID",
        500
      );
      return next(error);
    }

    try {
      // Saves the Reply to the post by the ID
      await newReply.save();

      if (post && post.replies) {
        post.replies.push(newReply);
        await post.save();
      }

      if (user && user.replies) {
        // Saves the User ID of the replier
        user.replies.push(newReply);
        await user.save();
      }
    } catch (err) {
      const error = new HttpError("Failed to create the Reply", 500);
      return next(error);
    }

    res.status(201).json({ reply: newReply });
  }
};

// DOESNT WORK YET
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let posts: IPost[];

  try {
    posts = await PostSchema.find({});
  } catch (err) {
    const error = new HttpError("Cannot find any posts at the moment...", 500);
    return next(error);
  }
  res.json({
    posts: posts.map((post: IPost) => post.toObject({ getters: true })),
  });
};

export const getRepliesByPostID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let post;
  let postID = req.params.pid;

  try {
    post = await PostSchema.findById(postID).populate("replies");
  } catch (err) {
    const error = new HttpError("Cannot find this Post ID", 500);
    return next(error);
  }

  if (!post || !post.replies) {
    return next(
      new HttpError("Could not find cards for the provided user id", 404)
    );
  }

  res.json({
    posts: post.replies.map((reply: IReply) =>
      reply.toObject({ getters: true })
    ),
  });
};

export const getPostByPostID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let post;
  let postID = req.params.pid;

  try {
    post = await PostSchema.findById(postID);

    if (post) {
      res.json({
        posts: post.toObject({ getters: true }),
      });
    }
  } catch (err) {
    const error = new HttpError("Cannot find this Post ID", 500);
    return next(error);
  }
};
