import express from "express";
import { check } from "express-validator";
import { loginUser, signupUser, getUser } from "../controllers/userControllers";
import { jwtAuth } from "../utility/checkToken";

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

router.get("/:uid", jwtAuth, getUser);

module.exports = router;
