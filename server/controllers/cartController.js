import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { restaurantId, productId, quantity } = req.body;

    // Validation
    if (!restaurantId || !productId || quantity == null) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const qty = Number(quantity);

    if (qty < 1) {
      return res.json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const menu = await Menu.findById(productId);

    if (!menu) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    // Find cart
    let cart = await Cart.findOne({ userId });

    if (cart && cart.restaurantId?.toString() !== restaurantId) {
      return res.json({
        success: false,
        message: "Only one restaurant allowed per cart",
      });
    }

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        restaurantId,
        items: [
          {
            productId,
            name: manu.name,
            price: menu.price,
            quantity: qty,
            totalItemPrice: qty * menu.price,
          },
        ],
      });
    } else {
      // Check if product exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += qty;

        //Calculating total price
        cart.items[itemIndex].totalItemPrice =
          cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        // Add new item
        cart.items.push({
          productId,
          name: menu.name,
          price: menu.price,
          quantity: qty,
          totalItemPrice: qty * menu.price,
        });
      }
    }

    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 0);

    await cart.save();

    return res.json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price image")
      .lean();

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: [],
          subtotal: 0,
          totalAmount: 0,
        },
      });
    }

    return res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Error fetching cart",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    //find cart
    const cart = await Cart.findOne({ userId });

    //  If cart doesn't exist
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart already empty",
        cart: {
          items: [],
          subtotal: 0,
          totalAmount: 0,
        },
      });
    }

     // ✅ Clear cart instead of deleting
    cart.items = [];
    cart.restaurantId = null;
    cart.subtotal = 0;
    cart.totalAmount = 0;

    await cart.save();

    return res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Error clearing cart" || error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: true,
        message: "Cart is already empty",
        cart: {
          items: [],
          subtotal: 0,
          totalAmount: 0,
        },
      });
    }

    const pid = String(productId).trim();

    const itemIndex = cart.items.findIndex(
      (item) => item.productId?.toString() === pid,
    );

    if (itemIndex === -1) {
      return res.json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items.splice(itemIndex, 1);

    if (cart.items.length === 0) {
      cart.restaurantId = null;
    }

    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 0);

    await cart.save();

    return res.json({
      success: true,
      message: "Product removed successfully",
      cart,
    });
  } catch (error) {
    console.error("REMOVE ERROR:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quantity, productId } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "ProductId and quantity are required",
      });
    }

    const qty = Number(quantity);

    //  Validation
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
      });
    }

    //  Find item
    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.json({
        success: false,
        message: "Product not found in cart",
      });
    }

    //  Update quantity
    item.quantity = qty;
    item.totalItemPrice = item.price * item.quantity;

    cart.subtotal = cart.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 0);

    await cart.save();

    return res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message || "Error updating cart",
    });
  }
};
