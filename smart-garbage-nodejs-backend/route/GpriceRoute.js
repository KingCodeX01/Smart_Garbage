// const express = require("express");
// const router = express.Router();
const router = require("express");
const app = router();
const multer = require("multer");
const Controller = require("../controller/GPriceController");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "images")); // Correctly navigate to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

app.post("/price", upload.array("images"), Controller.Store);
app.put("/price/:id", Controller.Update);
app.get("/getprice", Controller.GetPrice);
// router.get("/price", Controller.Store); // Uncomment if needed

module.exports = app;
