import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
