import dotenv from "dotenv";
import mongoose from "mongoose";
import { createAdmin } from "./models/adminModel.js";

dotenv.config();
const url = `${process.env.MONGODB_URI}${process.env.MONGO_DB}`;
console.log(url);
const connectDatabase = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database");
      createAdmin();
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};

export default connectDatabase;
