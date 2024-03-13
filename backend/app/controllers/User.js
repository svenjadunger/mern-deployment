

const UserModel = require("../../model/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
// Create and Save a new user
exports.create = async (req, res) => {
  // Deine bestehende Validierungslogik...

  const user = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    password: req.body.password, // Stelle sicher, dass du das Passwort hier hinzufügst
  });
    const imagePath = req.file ? req.file.path : null;

  try {
    const savedUser = await user.save();
    savedUser.password = undefined; // Entfernt das Passwortfeld
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



// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Update a user by the id in the request
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

// Delete a user with the specified id in the request
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
  // Hier kommt deine Logik zur Validierung der anderen Felder
  try {
    const user = new User({
      // Deine anderen Benutzerfelder
      image: req.file.path, // Pfad zum Bild
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
