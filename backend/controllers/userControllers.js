const UserSchema = require("../models/userSchema");
const HttpError = require("../models/errorHandleModel");

const signupUser = async (req, res, next) => {
  const { name, username, password } = req.body;

  //Checks if a user exists in the databasxxe
  let existingUser;

  try {
    // finds one document that matches
    existingUser = await UserSchema.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Cannot Access Database", 500);
    return next(error);
  }

  // checks if user exists already
  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  //Setup for the new User created
  const newUser = new UserSchema({
    name,
    username,
    password,
    posts: [],
    replies: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Cannot Create the new User... Try Again", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Signed Up",
    users: newUser.toObject({ getters: true }),
  });
};

// LOGIN CONTROLLER
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;

  //Checks if a user exists in the databasxxe
  try {
    existingUser = await UserSchema.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Cannot Log In", 500);
    return next(error);
  }

  //Checks if credentials match database ones
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Login Failed, the Credentials do not match... Try Again",
      400
    );
    return next(error);
  }

  res.json({
    message: "Logged In",
    users: existingUser.toObject({ getters: true }),
  });
};

const getUser = async(req, res, next) => {
  let userId = req.params.uid;

  let user;
  try{
    user = await UserSchema.findById(userId);
  }
  catch(err){
    const error = new HttpError(
      "Cannot find the User... Try Again",
      500
    );
    return next(error);
  }
  res.json({
    users: user.toObject({ getters: true }),
  });
}

// the exports used in the routes
exports.loginUser = loginUser;
exports.signupUser = signupUser;
exports.getUser = getUser;
