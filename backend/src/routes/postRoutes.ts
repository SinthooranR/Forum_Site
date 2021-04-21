import express from "express";
import { check } from "express-validator";
import {
  createPost,
  createReply,
  getPosts,
  getPostByPostID,
  getRepliesByPostID,
} from "../controllers/postControllers";

const router = express.Router();

router.post(
  "/createPost",
  check("title", "Must have a title").not().isEmpty(),
  [check("paragraph", "Must have something in the Post").not().isEmpty()],
  createPost
);

router.post(
  "/createReply",
  [check("paragraph", "Must have something in the Reply").not().isEmpty()],
  createReply
);

router.get("/getPosts", getPosts);

router.get("/getReplies/:pid", getRepliesByPostID);

router.get("/:pid", getPostByPostID);

module.exports = router;
