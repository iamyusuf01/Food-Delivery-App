import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/database.js";
import e from "cors";

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

connectDB();

app.use(express.json());
// app.cors(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
