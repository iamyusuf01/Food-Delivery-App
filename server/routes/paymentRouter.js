import express from 'express'
import { createPaymentOrder, verifyPayment } from '../controllers/paymentController.js';
import auth from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/create',auth, createPaymentOrder)
router.post('/verify',auth, verifyPayment)


export default router