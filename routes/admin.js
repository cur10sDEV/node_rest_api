const express = require("express");
const router = express.Router();
const {
  getUserPosts,
  getUserPost,
  createPost,
  editPost,
  deletePost,
} = require("../controllers/admin");
const {
  postTitleValidator,
  postContentValidator,
} = require("../middlewares/validators/postValidator");

router.get("/posts", getUserPosts);

router.get("/posts/post/:id", getUserPost);

router.post(
  "/posts/create",
  [postTitleValidator(), postContentValidator()],
  createPost
);

router.put(
  "/posts/edit/:id",
  [postTitleValidator(), postContentValidator()],
  editPost
);

router.delete("/posts/delete/:id", deletePost);

module.exports = router;
