import express from "express";
import { addRestaurant } from "../controllers/restaurantControllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router()

router.post('/add', upload.fields([{ name: "avatar", maxCount: 1 }]), addRestaurant)

export default router