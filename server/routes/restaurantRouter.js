import express from "express";
import { addRestaurant, deleteRestaurant, getAllRestaurants, getCurrentRestaurant, updateRestaurantAvatar } from "../controllers/restaurantControllers.js";
import { upload } from "../middlewares/multer.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Add Restaurants 
router.post('/add', authorizeRoles('admin', 'seller'), upload.fields([{ name: "avatar", maxCount: 1 }]), addRestaurant)
// update restaurant avatar
router.put('/:restaurantId/avatar', authorizeRoles('admin', 'seller'), upload.single('avatar'), updateRestaurantAvatar)
// Get All restaurants
router.get('/all', getAllRestaurants)
// Fetch all current restaurant
router.get('/:restaurantId', getCurrentRestaurant)
// delete restaurants
router.delete('/:restaurantId', auth, authorizeRoles('admin'), deleteRestaurant)

export default router