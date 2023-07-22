const { createPost } = require("../controllers/admin");
const { expect } = require("chai");
const User = require("../models/User");
const Post = require("../models/Post");
const sinon = require("sinon");
const mongoose = require("mongoose");
const connectDB = require("../db/connectDB");
let user;
describe("Admin Controller - Create Post", () => {
  before(async () => {
    connectDB("mongodb://127.0.0.1:27017/test");
    user = await new User({
      email: "specsx@test.com",
      password: "itsmypassword123",
      username: "specsxxxx",
    });
    await user.save();
  });
  it("should add created post to user's post array", async () => {
    const req = {
      body: {
        title: "This is a test post!",
        content:
          "this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post this is a test content for the test post ",
      },
      file: {
        path: "kjfaljdaf",
      },
      userId: user._id,
    };
    const result = await createPost(req, {}, () => {});
    console.log(result);
    expect(result.posts).to.have.length(1);
  });
  after(async () => {
    await User.deleteMany({ email: user.email });
    mongoose.disconnect();
  });
});
