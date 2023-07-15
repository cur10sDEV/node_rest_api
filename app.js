const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const multer = require("multer");

connectDB();
// routes
const feedRoutes = require("./routes/feed");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

// setting up cors - headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-HEADERS", "Content-Type, Authorization");
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("imgUrl")
);

app.use("/feed", feedRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log(`Server running on port 3000`));
