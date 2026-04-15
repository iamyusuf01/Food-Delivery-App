import { razorpayInstance } from "../config/razorpay.js";
import Order from "../models/orderModel.js";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
import cron from 'node-cron'

export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const existingPayment = await Payment.findOne({
      orderId: order._id,
      status: "PENDING",
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already initiated",
        razorpayOrderId: existingPayment.razorpayOrderId,
        paymentId: existingPayment._id,
      });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    const options = {
      amount: Math.round(order.totalAmount * 100), // paise
      currency: "INR",
      receipt: order._id.toString(),
      notes: {
        orderId: order._id.toString(),
        userId: order.userId.toString(),
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    const payment = await Payment.create({
      userId: order.userId,
      orderId: order._id,
      amount: order.totalAmount,
      currency: "INR",
      status: "PENDING",
      razorpayOrderId: razorpayOrder.id,
      receipt: order._id.toString(),
      notes: {
        orderId: order._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      razorpayOrder,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Payment Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "SUCCESS") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        payment,
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Payment.findByIdAndUpdate(payment._id, {
        status: "FAILED",
        failureReason: "Invalid signature",
      });

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "SUCCESS";
    await payment.save();

    await Order.findByIdAndUpdate(payment.orderId, {
      paymentStatus: "PAID",
      status: "CONFIRMED",
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const initiateRefund = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: "PaymentId is required",
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status !== "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Only successful payments can be refunded",
      });
    }

    if (payment.refundStatus === "PROCESSED") {
      return res.status(400).json({
        success: false,
        message: "Refund already processed",
      });
    }

    const refund = await razorpayInstance.payments.refund(
      payment.razorpayPaymentId,
      {
        amount: Math.round(payment.amount * 100), // paise
      }
    );

    payment.refundId = refund.id;
    payment.refundStatus = "PROCESSED";
    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Refund successful",
      refund,
    });

  } catch (error) {
    console.error("Refund Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

cron.schedule("*/10 * * * * ", async () => {
  const expiredPayment = await Payment.find({
    status: 'PENDING',
    createdAt: {
      $lt: new Date(Date.now() - 15 * 60 * 1000),

    }
  })

  for(const payment of expiredPayments){
    payment.status = "FAILED",
    payment.failureReason = 'Timeout';
    await payment.save();
  }

  console.log('Expired payments cleared')
})