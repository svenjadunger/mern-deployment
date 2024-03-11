import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; 

const router = express.Router();

// get route for benutzerdaten
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

// POST Route for Benutzerregistrierung
router.post("/register", async (req, res) => {
  const { name, email, password, picture } = req.body;

  try {
    // does user exist?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash passw. vor  Speichern
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user with password(verschlüsselt)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      picture,
    });

    await user.save();
    res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
