const express = require("express");
const { check } = require("express-validator");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/login",
  [
    check("username").isLength({ min: 6, max: 10 }),
    check("password").isLength({ min: 6, max: 10 }),
  ],
  userControllers.loginUser
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("username").isLength({ min: 6, max: 10 }),
    check("password").isLength({ min: 6, max: 10 }),
  ],
  userControllers.signupUser
);

module.exports = router;
