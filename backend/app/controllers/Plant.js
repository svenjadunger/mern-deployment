const PlantModel = require("../../model/plant");
// Create and Save a new plant
exports.create = async (req, res) => {
  if (!req.body.name && !req.body.region && !req.body.family) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

 const plant = new PlantModel({
   symbol: req.body.symbol, // Assuming `symbol` is sent in the request body
   synonymSymbol: req.body.synonymSymbol, // Assuming `synonymSymbol` is sent in the request body
   scientificNameWithAuthor: req.body.scientificNameWithAuthor, // Assuming this is sent in the request body
   commonName: req.body.name, // Adjusted to map `name` from the request to `commonName`
   family: req.body.family, // Assuming `family` is sent in the request body
 });


  await plant
    .save()
    .then((data) => {
      res.send({
        message: "Plant created successfully!!",
        plant: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating plant",
      });
    });
};
// Retrieve all plants from the database.
exports.findAll = async (req, res) => {
  try {
    const plant = await PlantModel.find();
    res.status(200).json(plant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Find a single Plant with an id
exports.findOne = async (req, res) => {
  try {
    const plant = await PlantModel.findById(req.params.id);
    res.status(200).json(plant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Update a plant by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await PlantModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Plant not found.`,
        });
      } else {
        res.send({ message: "Plant updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
// Delete a plant with the specified id in the request
// Delete a plant with the specified id in the request
exports.destroy = async (req, res) => {
  await PlantModel.findByIdAndDelete(req.params.id) // Changed from findByIdAndRemove to findByIdAndDelete
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Plant not found.`,
        });
      } else {
        res.send({
          message: "Plant deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
