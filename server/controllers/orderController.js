import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";
import Order from "../models/orderModel.js";

export const placeOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body; 

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const { street, state, city, pincode } = address;

    if (!street || !state || !city || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Add delivery address",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const menu = await Menu.findById(item.productId);
        if (!menu) throw new Error("Item not found");

        return {
          menuItem: menu._id,
          name: menu.name,
          image: menu.image,
          price: menu.price,
          quantity: item.quantity,
        };
      })
    );

    const order = await Order.create({
      userId,
      restaurantId: cart.restaurantId,
      items: orderItems,
      address,
      deliveryFee: cart.deliveryFee || 49,
      paymentMethod: "ONLINE", 
      paymentStatus: "PENDING",
      status: "PLACED",
    });


    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    return res.json({   
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const changePaymentMethod = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId, paymentMethod } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order id is missing",
      });
    }

    if (!paymentMethod || !["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Select valid payment method",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      });
    }

    order.paymentMethod = paymentMethod;

    if (paymentMethod === "COD") {
      order.paymentStatus = "PAID";
      order.status = "CONFIRMED";

      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } }
      );
    }

    await order.save();

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("CHANGE PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};