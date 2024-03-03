var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  synonymSymbol: {
    type: String,
    default: "",
  },
  scientificNameWithAuthor: {
    type: String,
    required: true,
  },
  commonName: {
    type: String,
    required: true,
    unique: true,
  },
  family: {
    type: String,
    default: "",
  },
});

var Model = mongoose.model("Plants", schema);

module.exports = Model;
