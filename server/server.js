import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRouter.js";

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

connectDB();

app.use(express.json());
app.use(cookieParser())
// app.cors(cors());


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
