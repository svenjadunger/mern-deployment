// first data
import express from "express";
import Flower from "../model/Flowersmodel.js"; 

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const flowers = await Flower.find({});
    res.json(flowers);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});

export default router;
