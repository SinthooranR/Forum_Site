import UserSchema from "../models/userSchema";
import HttpError from "../models/errorHandleModel";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { IUser } from "../models/interfaces/interfaces";
import { tokenGen } from "../utility/generateToken";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, username, password } = req.body;

  let validateError = validationResult(req);

  if (!validateError.isEmpty()) {
    res.status(422).json({ errors: validateError.array() });
  } else {
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

    const hashedPassword = await bcrypt.hash(password, 12);

    //Setup for the new User created
    const newUser = new UserSchema({
      name,
      username,
      password: hashedPassword,
      posts: [],
      replies: [],
    });

    try {
      await newUser.save();
      const token = tokenGen(newUser);

      res.status(201).json({
        token,
        ...newUser._doc,
        message: "Signed Up",
      });
    } catch (err) {
      const error = new HttpError(
        "Cannot Create the new User... Try Again",
        500
      );
      return next(error);
    }
  }
};

// LOGIN CONTROLLER
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  let validateError = validationResult(req);

  if (!validateError.isEmpty()) {
    // console.log(validateError.mapped());
    res.status(422).json({ errors: validateError.array() });
  } else {
    let existingUser: IUser | null;

    //Checks if a user exists in the databasxxe
    try {
      existingUser = await UserSchema.findOne({ username: username });

      if (existingUser) {
        //Checks if credentials match database ones
        const passwordCompare = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!passwordCompare) {
          const error = new HttpError("Password doesn't match", 400);
          return next(error);
        }

        const token = tokenGen(existingUser);

        res.status(201).json({
          token,
          ...existingUser._doc,
          message: "Logged In",
        });
      }
    } catch (err) {
      const error = new HttpError("Cannot Log In", 500);
      return next(error);
    }
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userId = req.params.uid;

  let user: IUser | null;
  try {
    user = await UserSchema.findById(userId);
    if (user) {
      res.json({
        users: user.toObject({ getters: true }),
      });
    }
  } catch (err) {
    const error = new HttpError("Cannot find the User... Try Again", 500);
    return next(error);
  }
};
