const express = require("express");
const { multerUpload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/upload", multerUpload.single("picture"), (req, res) => {
  if (req.file) {
    // Hier kannst du zusätzliche Logik einfügen, z.B. den Pfad in der DB speichern
    res.json({
      message: "Bild erfolgreich hochgeladen",
      filePath: req.file.path,
    });
  } else {
    res.status(400).send("Fehler beim Hochladen des Bildes");
  }
});

module.exports = router;
