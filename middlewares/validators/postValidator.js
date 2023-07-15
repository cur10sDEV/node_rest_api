const { body } = require("express-validator");

const postTitleValidator = (req, res, next) => {
  return body("title", "The title must be atleast two characters long")
    .trim()
    .isString()
    .escape()
    .isLength({ min: 2, max: 128 });
};

const postContentValidator = (req, res, next) => {
  return body("content", "The content must be atleast hundred characters long")
    .trim()
    .isString()
    .escape()
    .isLength({ min: 100, max: 10000 });
};

module.exports = { postTitleValidator, postContentValidator };
