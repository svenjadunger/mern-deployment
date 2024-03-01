import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
});

const Flower = mongoose.model("Flower", flowerSchema);


router.get("/all", async (req, res) => {
  try {
    const flowers = await User.find({});
    res.send(flowers);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});


export default Flower;

