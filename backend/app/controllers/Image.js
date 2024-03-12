// controllers/ImageController.js

const ImageModel = require("../../models/Image");
// Funktion zum Hochladen eines Bildes
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Bitte ein Bild hochladen." });
  }
  // Hier könntest du das Bild in deiner Datenbank speichern, z.B.:
  const imagePath = req.file.path; // Der Pfad des hochgeladenen Bildes
  const newImage = new ImageModel({
    path: imagePath,
    // Weitere Bild-Informationen
  });

  try {
    const savedImage = await newImage.save();
    res.status(201).send({ message: "Bild erfolgreich hochgeladen", path: `http://localhost:3000/${imagePath}` });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Weitere Funktionen zum Abrufen und Löschen von Bildern...
