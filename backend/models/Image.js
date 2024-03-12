// model/image.js

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  // Füge hier weitere Eigenschaften hinzu, wie z.B. 'createdAt' oder 'tags', wenn nötig
});

module.exports = mongoose.model("Image", imageSchema);
