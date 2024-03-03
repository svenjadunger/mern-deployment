const express = require("express");
const PlantController = require("../controllers/Plant");
const router = express.Router();



router.get("/", PlantController.findAll);
router.get("/:id", PlantController.findOne);
router.post("/", PlantController.create);
router.patch("/:id", PlantController.update);
router.delete("/:id", PlantController.destroy);
module.exports = router;
