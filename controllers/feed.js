const Post = require("../models/Post");

const getPosts = async (req, res, next) => {
  try {
    const { page } = req.query;
    const currentPage = page ? Number(page) : 1;
    const limitPerPage = 3;
    const posts = await Post.find()
      .populate("author")
      .skip((currentPage - 1) * limitPerPage)
      .limit(limitPerPage);
    if (!posts) {
      const error = new Error("No posts found!");
      error.statusCode = 404;
      throw error;
    }
    const postsCount = await Post.countDocuments();
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

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");
    if (!post) {
      const error = new Error("Could not find the post");
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

module.exports = {
  getPosts,
  getPost,
};
