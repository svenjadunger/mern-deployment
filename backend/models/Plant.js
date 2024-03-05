import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: String,
  species: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;
