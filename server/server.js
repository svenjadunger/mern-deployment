import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/Plants")
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));
