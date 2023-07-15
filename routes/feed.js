const express = require("express");
const router = express.Router();

const { getPosts, getPost } = require("../controllers/feed");

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);

module.exports = router;
