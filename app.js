var express = require("express");
var dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
var upload = require("./multer");
var app = express();
var cloudinary = require("./cloudinary");
const cors = require("cors");
require("./db");
const posts = require("./models/images");

const userRoute = require("./routes/userRoutes");
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // "preflightContinue": false,
    // "optionsSuccessStatus": 204
  })
);
app.use(express.json());
app.use(userRoute);
const authentication = require("./middlewares/userAuthentication")
app.post("/file",authentication, upload.single("fileupload"), function (req, res) {
  const user =req.user
  const post = req.body;
  console.log("dede")
  var image_url = [];
  fs.readdir("uploads/", (err, data) => {
    if (err) {
      throw err;
    }
    let temp = data;
    for (let i = 0; i < temp.length; i++) {
      if (/.jpg$/.test(temp[i])) {
        cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
          console.log(result.secure_url);
          image_url.push(result.secure_url);
        });
      } else if (/.jpeg$/.test(temp[i])) {
        cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
          console.log(result.secure_url);
          image_url.push(result.secure_url);
        });
      } else if (/.png$/.test(temp[i])) {
        cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
          console.log(result.secure_url);
          image_url.push(result.secure_url);
        });
      } else if (/.webp$/.test(temp[i])) {
        cloudinary.uploader.upload(`uploads/${temp[i]}`, (err, result) => {
          console.log(result.secure_url);
          image_url.push(result.secure_url);
        });
      }
    }
  });
  setTimeout(() => {
    post.image_url = image_url[0];
    let newPost = new posts({ ...post });
    newPost.save();
    res.send(newPost);
  }, 25000);
});
app.get("/upload", function (req, res) {
  console.log(path);
  res.render("file", {
    title: "home page",
  });
});
app.use(function (err, req, res, next) {
  if ((err.name = "multerError")) return res.send(err.message);
  console.log(err);
  // res.send(err.message)
});
module.exports = app;
