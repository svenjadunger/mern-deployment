const express = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const { multerUpload } = require("../../middlewares/uploadMiddleware");


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
router.post("/register", multerUpload.single("picture"), async (req, res) => {
  const { name, email, password } = req.body; // `picture` wird nicht mehr hier extrahiert
  // Der Rest der Logik bleibt gleich, mit einer Anpassung, um das Bild zu verarbeiten:
  const picture = req.file ? req.file.path : null;

  try {
    // does user exist?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash passw. vor Speichern
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user with password(verschlüsselt) and picture path if available
    const user = new User({
      name,
      email,
      password: hashedPassword,
      picture, // Hier wird nun der Pfad zum Bild gespeichert, wenn vorhanden
    });

    await user.save();
    res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
