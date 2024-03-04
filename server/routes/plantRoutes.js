import express from "express";
import Flower from "../model/FlowersModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const plants = await Flower.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
