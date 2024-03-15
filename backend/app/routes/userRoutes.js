const express = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const { multerUpload } = require("../../middlewares/uploadMiddleware");


const router = express.Router();



//login: 
const jwt = require("jsonwebtoken");

// Ersetze "deinGeheimerSchlüssel" durch einen echten geheimen Schlüssel, der in deiner Umgebungskonfiguration gespeichert ist
const SECRET_KEY = "deinGeheimerSchlüssel";

// POST Route für Benutzer-Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüfe, ob der Benutzer existiert
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          error: "Authentifizierung fehlgeschlagen: Benutzer nicht gefunden.",
        });
    }

    // Überprüfe das Passwort
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          error: "Authentifizierung fehlgeschlagen: Falsches Passwort.",
        });
    }

    // Erstelle JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Serverfehler" });
  }
});








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
  const { name, email, password } = req.body; 
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
      picture, 
    });

    await user.save();
    res.status(201).json({ message: "Account successfully created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
