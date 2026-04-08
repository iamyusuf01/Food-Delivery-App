import express from "express";
import { placeOrderFromCart } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrderFromCart);

export default router;