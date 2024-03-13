

const UserModel = require("../../model/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
// Create and Save new user
exports.create = async (req, res) => {


  const user = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password, 
  });
    const imagePath = req.file ? req.file.path : null;

  try {
    const savedUser = await user.save();
    savedUser.password = undefined; 
    res.status(201).send({
      message: "User created successfully!!",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user",
    });
  }
};



exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};


exports.destroy = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id) 
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({
          message: "User deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};


exports.register = async (req, res) => {

  try {
    const user = new User({
    
      image: req.file.path, 
    });
    await user.save();
    res.status(201).send({ message: "Benutzer erfolgreich erstellt", user });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Fehler bei der Erstellung des Benutzers",
        error: error.message,
      });
  }
};
