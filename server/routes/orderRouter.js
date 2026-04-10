import express from "express";
import { getOrderById, getUserOrder, placeOrderFromCart, updateOrderStatus } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place", auth, placeOrderFromCart);
router.post("/update", auth, updateOrderStatus );
router.post("/get-order", auth, getUserOrder );
router.post("/:id", auth, getOrderById );

export default router;