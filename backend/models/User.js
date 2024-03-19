const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  picture: String, 
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

// POST Route für Benutzer-Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          error: "Authentifizierung fehlgeschlagen: Benutzer nicht gefunden.",
        });
    }

    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          error: "Authentifizierung fehlgeschlagen: Falsches Passwort.",
        });
    }

   
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

module.exports = router;