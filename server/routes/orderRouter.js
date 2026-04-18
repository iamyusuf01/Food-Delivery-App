import express from "express";
import { getOrderById, getUserOrder, placeOrderFromCart, updateOrderStatus } from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place", auth, placeOrderFromCart);
router.put("/update", auth, updateOrderStatus );
router.get("/get-order", auth, getUserOrder );
router.get("/:id", auth, getOrderById );


export default router;