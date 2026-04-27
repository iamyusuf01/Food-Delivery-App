import express from 'express'
import { createPaymentOrder, initiateRefund, verifyPayment } from '../controllers/paymentController.js';
import auth from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/initiate',auth, createPaymentOrder)
router.post('/verify',auth, verifyPayment)
router.post('/refund',auth, initiateRefund)


export default router