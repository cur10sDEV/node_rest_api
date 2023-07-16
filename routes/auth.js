const express = require("express");
const router = express.Router();
const { loginUser, signUpUser } = require("../controllers/auth");
const {
  usernameValidation,
  emailValidation,
  passwordValidation,
  isUsernameUnique,
  isEmailUnique,
} = require("../middlewares/validators/authValidator");

router.post("/login", [emailValidation(), passwordValidation()], loginUser);

router.post(
  "/signup",
  [
    usernameValidation(),
    emailValidation(),
    passwordValidation(),
    isUsernameUnique(),
    isEmailUnique(),
  ],
  signUpUser
);

module.exports = router;
