const express = require("express");
const postControllers = require("../controllers/postControllers");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/createPost",
  check("title").not().isEmpty(),
  [check("paragraph").not().isEmpty()],
  postControllers.createPost
);

router.post(
  "/createReply",
  [check("paragraph").not().isEmpty()],
  postControllers.createReply
);

router.get("/getPosts", postControllers.getPosts);

module.exports = router;
