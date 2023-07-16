const { body } = require("express-validator");
const User = require("../../models/User");

const usernameValidation = (req, res, next) => {
  return body("username")
    .isString()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage(
      "Username should be minimum 5 characters long and not greater than 12 characters"
    );
};

const emailValidation = (req, res, next) => {
  return body("email").isEmail().withMessage("Please Enter a valid email");
};

const passwordValidation = (req, res, next) => {
  return body("password")
    .isString()
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password should be minimum 8 characters long");
};

const isEmailUnique = (req, res, next) => {
  return body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("A user already exists with this email");
    }
  });
};

const isUsernameUnique = (req, res, next) => {
  return body("username").custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error("That username has already been taken");
    }
  });
};

module.exports = {
  usernameValidation,
  emailValidation,
  passwordValidation,
  isEmailUnique,
  isUsernameUnique,
};
