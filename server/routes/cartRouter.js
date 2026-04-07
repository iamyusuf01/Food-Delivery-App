import express from "express";
import auth from "../middlewares/authMiddleware.js";

import { addProduct, clearCart, getCart, removeProduct, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add', auth, addProduct)
router.get('/get-cart', auth, getCart)
router.delete('/:productId', auth, removeProduct)
router.put('/update', auth, updateQuantity)
router.post('/clear', auth, clearCart)

export default router;