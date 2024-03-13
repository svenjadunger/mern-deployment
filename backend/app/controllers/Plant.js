const PlantModel = require("../../model/plant");
// Create new plant
exports.create = async (req, res) => {
  if (!req.body.name && !req.body.region && !req.body.family) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

 const plant = new PlantModel({
   symbol: req.body.symbol, 
   synonymSymbol: req.body.synonymSymbol,
   scientificNameWithAuthor: req.body.scientificNameWithAuthor, 
   commonName: req.body.name, 
   family: req.body.family, 
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
// Retrieve plants from  database
exports.findAll = async (req, res) => {
  try {
    const plant = await PlantModel.find();
    res.status(200).json(plant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Find single Plant with  id
exports.findOne = async (req, res) => {
  try {
    const plant = await PlantModel.findById(req.params.id);
    res.status(200).json(plant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Update plant
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
// Delete plant 
exports.destroy = async (req, res) => {
  await PlantModel.findByIdAndDelete(req.params.id) 
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
