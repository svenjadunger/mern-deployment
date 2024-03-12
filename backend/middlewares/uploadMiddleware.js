const multer = require("multer");
const path = require("path");

exports.multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname).toLowerCase();
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    cb(null, true);
  },
});
