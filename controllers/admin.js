const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");
const { deleteFile } = require("../utils/fileHandler");
const { getIO } = require("../utils/socket");

const getUserPosts = async (req, res, next) => {
  try {
    const { page } = req.query;
    const userId = req.userId;
    const currentPage = page ? Number(page) : 1;
    const limitPerPage = 3;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author")
      .skip((currentPage - 1) * limitPerPage)
      .limit(limitPerPage);
    if (!posts) {
      const error = new Error("No posts found!");
      error.statusCode = 404;
      throw error;
    }
    const postsCount = await Post.find({ author: userId }).countDocuments();
    const hasNextPage = postsCount - currentPage * limitPerPage > 0;
    return res.status(200).json({
      msg: "success",
      posts: posts,
      currentPage: currentPage,
      hasNextPage: hasNextPage,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!id) {
      const error = new Error("No post found!");
      error.statusCode = 404;
      throw error;
    }
    const post = await Post.findOne({ _id: id, author: userId }).populate(
      "author"
    );
    if (!post) {
      const error = new Error("No post found!");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      msg: "success",
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Creating a new post failed!");
      error.statusCode = 422;
      throw error;
    }
    const userId = req.userId;
    const { title, content } = req.body;
    if (!req.file) {
      const error = new Error("Failed to upload the cover image!");
      error.statusCode = 422;
      throw error;
    }
    const { path } = req.file;
    const post = new Post({
      title: title,
      content: content,
      imgUrl: path,
      author: userId,
    });
    await post.save();
    const author = await User.findOne({ _id: userId });
    author.posts.push(post);
    await author.save();
    getIO().emit("posts", { action: "create", post: post });
    return res.status(201).json({
      msg: "success",
      errors: [],
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Editing a post failed!");
      error.statusCode = 422;
      throw error;
    }
    const userId = req.userId;
    const { id } = req.params;
    if (!id) {
      const error = new Error("Editing a post failed!");
      error.statusCode = 422;
      throw error;
    }
    const { title, content } = req.body;
    const path = req.file ? req.file.path : undefined;
    const post = await Post.findOne({ _id: id, author: userId });
    post.title = title;
    post.content = content;
    if (path) {
      deleteFile(post.imgUrl);
      post.imgUrl = path;
    }
    await post.save();
    getIO().emit("posts", { action: "edit", post: post });
    return res.status(201).json({
      msg: "success",
      errors: [],
      post: post,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Deleting a post failed!");
      error.statusCode = 422;
      throw error;
    }
    const userId = req.userId;
    const post = await Post.findOne({ _id: id, author: userId });
    if (!post) {
      const error = new Error("No post found!");
      error.statusCode = 404;
      throw error;
    }
    deleteFile(post.imgUrl);
    const user = await User.findOne({ _id: userId });
    user.posts.pull(id);
    await user.save();
    await Post.deleteOne({ _id: id });
    getIO().emit("posts", { action: "delete", post: post });
    return res.status(200).json({
      msg: "success",
      errors: [],
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

module.exports = {
  getUserPosts,
  getUserPost,
  createPost,
  editPost,
  deletePost,
};
