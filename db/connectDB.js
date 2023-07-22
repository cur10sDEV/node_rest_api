const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri || process.env.DB_URI);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
