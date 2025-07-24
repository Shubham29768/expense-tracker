const express = require("express");
const { protect } = require("../middleware/authMiddleware");
//const {}

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");
//const { Router } = require("react-router-dom");
const upload = require("../middleware/uploadMiddleware");

const routes = express.Router();

routes.post("/register",registerUser);
routes.post("/login",loginUser);
routes.get("/getUser", protect, getUserInfo);

routes.post("/upload-image", upload.single("image"), (req, res) =>{
  if (!req.file){
    return res.status(400).json({ message: "No file uploaded"});
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl});
});

module.exports= routes;