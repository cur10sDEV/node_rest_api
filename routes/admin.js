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

const isAuth = require("../middlewares/isAuth");

router.get("/posts", isAuth, getUserPosts);

router.get("/posts/post/:id", isAuth, getUserPost);

router.post(
  "/posts/create",
  [postTitleValidator(), postContentValidator()],
  isAuth,
  createPost
);

router.put(
  "/posts/edit/:id",
  [postTitleValidator(), postContentValidator()],
  isAuth,
  editPost
);

router.delete("/posts/delete/:id", isAuth, deletePost);

module.exports = router;
