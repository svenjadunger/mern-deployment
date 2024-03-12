const express = require("express");
const router = express.Router();
const { multerUpload } = require("../../middlewares/uploadMiddleware"); 
const ImageController = require("../controllers/Image"); 

router.post(
  "/upload",
  multerUpload.single("image"),
  ImageController.uploadImage
);


module.exports = router;
