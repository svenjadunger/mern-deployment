import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

export default User;


router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: "An error occurred" });
  }
});
