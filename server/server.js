import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
app.use(cors());
import mongoose from "mongoose";
import flowersRouter from "./routes/flowers.js";
// import UserModel from "./model/UserModel.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/flowers", flowersRouter);

mongoose
  .connect("mongodb://localhost:27017/Plants")
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// app.get("/users/all", async (req, res) => {
//   try {
//     const users = await UserModel.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).send({ error: "An error occurred" });
//   }
// });


