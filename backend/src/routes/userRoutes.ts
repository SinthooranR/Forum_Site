import express from "express";
import { check } from "express-validator";
import { loginUser, signupUser, getUser } from "../controllers/userControllers";

const router = express.Router();

router.post(
  "/login",
  [
    check("username", "Username must be between 6-10 characters").isLength({
      min: 6,
      max: 10,
    }),
    check("password", "Password must be between 6-10 characters").isLength({
      min: 6,
      max: 10,
    }),
  ],
  loginUser
);

router.post(
  "/signup",
  [
    check("name", "Name must exist!").not().isEmpty(),
    check("username", "Username must be between 6-10 characters").isLength({
      min: 6,
      max: 10,
    }),
    check("password", "Password must be between 6-10 characters").isLength({
      min: 6,
      max: 10,
    }),
  ],
  signupUser
);

router.get("/:uid", getUser);

module.exports = router;
