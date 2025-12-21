import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import menuRouter from './routes/menuRouter.js'


// dotenv.config();
// dotenv.config({
//   path: './env'
// })

const app = express();
const PORT = process.env.PORT || 3000;
//MongoDB Connect
connectDB();

// Cloudinary Connect
// connectCloudinary()

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.cors(cors());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/menu", menuRouter );

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
