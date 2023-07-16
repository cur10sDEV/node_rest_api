const bcrypt = require("bcrypt");

const genHashPass = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePass = async (password, hashPass) => {
  const result = await bcrypt.compare(password, hashPass);
  return result;
};

module.exports = { genHashPass, comparePass };
