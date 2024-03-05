import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("plants");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "No user with that ID" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
