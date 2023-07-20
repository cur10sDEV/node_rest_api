const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const connectDB = require("./db/connectDB");
const multer = require("multer");
const { initIO } = require("./utils/socket");
const helmet = require("helmet");
const compresssion = require("compression");
const morgan = require("morgan");
const cors = require("cors");

connectDB();
// routes
const feedRoutes = require("./routes/feed");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

const isLogExists = fs.existsSync(path.join(__dirname, "logs"));
!isLogExists && fs.mkdirSync(path.join(__dirname, "logs"));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compresssion());
app.use(morgan("combined", { stream: accessLogStream }));

const exists = fs.existsSync(path.join(__dirname, "images"));
!exists && fs.mkdirSync(path.join(__dirname, "images"));
app.use("/images", express.static(path.join(__dirname, "images")));

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
app.use("/auth", authRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
initIO(server);
