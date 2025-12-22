import express from "express";
import { addRestaurant, deleteRestaurant, getAllRestaurants, getCurrentRestaurant } from "../controllers/restaurantControllers.js";
import { upload } from "../middlewares/multer.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/add', authorizeRoles('admin', 'seller'), upload.fields([{ name: "avatar", maxCount: 1 }]), addRestaurant)
router.get('/all', getAllRestaurants)
router.get('/:restaurantId', getCurrentRestaurant)
router.delete('/:restaurantId', auth, authorizeRoles('admin'), deleteRestaurant)

export default router