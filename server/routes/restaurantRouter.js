import express from "express";
import { addRestaurant, deleteRestaurant, getAllRestaurants, getCurrentRestaurant } from "../controllers/restaurantControllers.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router()

router.post('/add', upload.fields([{ name: "avatar", maxCount: 1 }]), addRestaurant)
router.get('/all', getAllRestaurants)
router.get('/restaurantId', getCurrentRestaurant)
router.delete('/restaurantId', deleteRestaurant)

export default router