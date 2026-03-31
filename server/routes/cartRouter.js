import express from "express";
import auth from "../middlewares/authMiddleware.js";

import { addProduct, getCart, removeProduct, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add', auth, addProduct)
router.get('/get-cart', auth, getCart)
router.delete('/:productId', auth, removeProduct)
router.put('/:productId', auth, updateQuantity)
// router.delete('/clear-cart', auth, clearCart)

export default router;