import { razorpayInstance } from "../config/razorpay.js";
import Order from "../models/orderModel.js";
import crypto from "crypto";

export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    //find order by id
    const order = await Order.findById(orderId);

    //check validation
    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    //Amount pay in Inr
    const options = {
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
      notes: {
        orderId: order._id.toString(),
      },
    };

    //create payment
    const razorpayOrder = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      razorpayOrder,
    });
  } catch (error) {
    console.error("Payment Order Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const order = await Order.findOne(orderId);

    if (!order) throw new Error("Order not found");

    ((order.paymentStatus = "SUCCESS"), (order.status = "CONFIRMED"));

    await order.save();

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
