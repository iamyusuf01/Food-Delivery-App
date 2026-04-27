import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";
import Order from "../models/orderModel.js";

export const placeOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, paymentMethod } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (!address) {
      return res.json({
        success: false,
        message: "address is required",
      });
    }
    const { street, state, city, pincode } = address;

    if (!street || !state || !city || !pincode) {
      return res.json({
        success: false,
        message: "Add delivery address",
      });
    }
    //Get Cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    //Build order
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
      }),
    );

    // Create Orders
    const order = await Order.create({
      userId,
      restaurantId: cart.restaurantId,
      items: orderItems,
      address: {
        street,
        state,
        city,
        pincode,
      },
      deliveryFee: cart.deliveryFee || 49,
      paymentMethod,
    });
    // cart.items = [];
    await cart.save();

    return res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return res.json({
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
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    return res.jons({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return res.json({
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
