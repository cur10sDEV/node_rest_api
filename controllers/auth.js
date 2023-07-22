const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { genHashPass, comparePass } = require("../utils/hashPassword");
const { validationResult } = require("express-validator");

const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { email, password } = req.body;
    // check for user with the provided email
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      const error = new Error("Incorrect User credentials");
      error.statusCode = 401;
      throw error;
    }
    // check whether the password provided is true or not
    const isPassTrue = await comparePass(password, user.password);
    if (!isPassTrue) {
      const error = new Error("Incorrect User credentials");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({
      token: token,
      userId: user._id.toString(),
    });
    return;
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
    return err;
  }
};

const signUpUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const { username, email, password } = req.body;
    const hashPass = await genHashPass(password);
    const user = new User({
      username: username,
      email: email,
      password: hashPass,
    });
    await user.save();
    res.status(201).json({
      msg: "success",
      errors: [],
      userId: user._id,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

const getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      status: user.status,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
    return err;
  }
};

module.exports = { loginUser, signUpUser, getUserStatus };
