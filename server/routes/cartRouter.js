import express from "express";
import auth from "../middlewares/authMiddleware.js";

import { addCartItem, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add-cart-item', auth, addCartItem)
router.get('/get-cart', auth, getCart)
router.delete('/:productId', auth, removeCartItem)
router.put('/update', auth, updateCartItem)
router.post('/clear', auth, clearCart)


export default router;