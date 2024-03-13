// controllers/ImageController.js

const ImageModel = require("../../models/Image");
// upload image
exports.uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Bitte ein Bild hochladen." });
  }
 
  const imagePath = req.file.path; 
  const newImage = new ImageModel({
    path: imagePath,
   
  });

  try {
    const savedImage = await newImage.save();
    res.status(201).send({ message: "Bild erfolgreich hochgeladen", path: `http://localhost:3000/${imagePath}` });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


