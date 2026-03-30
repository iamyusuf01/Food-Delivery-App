import express from "express";
import auth from "../middlewares/authMiddleware.js";

import { addProduct } from "../controllers/cartController.js";

const router = express.Router();

router.post('/add', auth, addProduct)


export default router;