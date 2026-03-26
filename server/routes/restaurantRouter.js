import express from "express";
import { addRestaurant, checkRestaurant, deleteRestaurant, getAllRestaurants, getCurrentRestaurant, updateRestaurantAvatar } from "../controllers/restaurantControllers.js";
import { upload } from "../middlewares/multer.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Add Restaurants 
router.post('/add', auth, authorizeRoles('seller'), upload.fields([{ name: "avatar", maxCount: 1 }]), addRestaurant)
// update restaurant avatar
router.put('/:id/avatar',auth, authorizeRoles( 'seller'), upload.single('avatar'), updateRestaurantAvatar)
// Get All restaurants
router.get('/all', getAllRestaurants)
// Fetch all current restaurant
router.get('/current-restaurant/:id', getCurrentRestaurant)
// delete restaurants
router.delete('/:id', auth, authorizeRoles('admin'), deleteRestaurant)
//check restaurant exists or not
router.get('/my-restaurant', auth, checkRestaurant)

export default router