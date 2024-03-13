const express = require("express");
const UserController = require("../controllers/User");
const router = express.Router();
const { multerUpload } = require("../../middlewares/uploadMiddleware");


router.post("/register", multerUpload.single("picture"), UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.post("/", UserController.create);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.destroy);
module.exports = router;
