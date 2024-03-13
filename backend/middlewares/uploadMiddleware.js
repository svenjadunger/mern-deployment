

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "UserImages/"); // Speicherort
  },
  filename: function (req, file, cb) {

    file.originalname = file.originalname.replace(" ", "-");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  let extension = path.extname(file.originalname).toLowerCase();
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    cb(new Error("Nur Bilder sind erlaubt (jpg, jpeg, png)"), false);
    return;
  }
  cb(null, true);
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
