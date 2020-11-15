const PostSchema = require("../models/postSchema");
const UserSchema = require("../models/userSchema");
const ReplySchema = require("../models/replySchema");
const HttpError = require("../models/errorHandleModel");

const createPost = async (req, res, next) => {
  const { title, paragraph, userID } = req.body;

  let newPost = new PostSchema({ title, paragraph, userID, replies: [] });

  let user;

  try {
    user = await UserSchema.findById(userID);
  } catch (err) {
    const error = new HttpError("Cannot find this user's ID", 500);
    return next(error);
  }

  try {
    await newPost.save(); //saves the newPost in its Collection
    user.posts.push(newPost); //adds the data into the users post array storage
    await user.save(); //updates the users data
  } catch (err) {
    const error = new HttpError("Failed to create the Post", 500);
    return next(error);
  }

  res.status(201).json({ post: newPost });
};

const createReply = async (req, res, next) => {
  const { paragraph, postID, userID } = req.body;
  let newReply = new ReplySchema({ paragraph, postID, userID, replies: [] });

  let post;
  let user;

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
    post.replies.push(newReply);
    await post.save();

    // Saves the User ID of the replier
    user.replies.push(newReply);
    await user.save();
  } catch (err) {
    const error = new HttpError("Failed to create the Reply", 500);
    return next(error);
  }

  res.status(201).json({ reply: newReply });
};

// DOESNT WORK YET
const getPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await PostSchema.find({});
  } catch (err) {
    const error = new HttpError("Cannot find any posts at the moment...", 500);
    return next(error);
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

exports.createPost = createPost;
exports.createReply = createReply;
exports.getPosts = getPosts;
