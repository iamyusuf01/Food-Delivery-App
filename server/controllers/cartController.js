import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addCartItem = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { restaurantId, quantity, productId } = req.body;

    if (!restaurantId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "restaurantId, productId and quantity are required",
      });
    }

    const qty = Number(quantity);

    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a valid number greater than 0",
      });
    }

    const menu = await Menu.findById(productId);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const price = menu.price;

    let cart = await Cart.findOne({ userId });

    // if (cart && cart.restaurantId?.toString() !== restaurantId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You can only order from one restaurant at a time",
    //   });
    // }

    if (!cart) {
      cart = new Cart({
        userId,
        restaurantId,
        items: [
          {
            productId,
            name: menu.name,
            price,
            quantity: qty,
            totalItemPrice: qty * price,
          },
        ],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;

        cart.items[itemIndex].totalItemPrice =
          cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        cart.items.push({
          productId,
          name: menu.name,
          price,
          quantity: qty,
          totalItemPrice: qty * price,
        });
      }
    }

    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + item.totalItemPrice,
      0,
    );

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 0);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price image")
      .lean();

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          restaurantId: null,
          items: [],
          subtotal: 0,
          deliveryFee: 30,
          totalAmount: 0,
        },
      });
    }

    const items = cart.items
      .filter((item) => item.productId)
      .map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
        totalItemPrice: item.quantity * item.productId.price,
      }));

    const subtotal = items.reduce((sum, item) => sum + item.totalItemPrice, 0);
    const deliveryFee = cart.deliveryFee || 30;
    const totalAmount = subtotal + deliveryFee;

    return res.status(200).json({
      success: true,
      cart: {
        ...cart,
        items,
        subtotal,
        deliveryFee,
        totalAmount,
      },
    });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await Cart.findOneAndDelete({ userId });

    return res.json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Clear failed",
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if(!productId) {
      return res.json({
        success: false,
        message : 'ProductId is missing'
      })
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.subtotal = cart.items.reduce(
      (sum, i) => sum + i.totalItemPrice,
      0
    );

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 30);

    await cart.save();

    return res.json({
      success: true,
      message: "Item removed",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
      item.totalItemPrice = quantity * item.price;
    }

    cart.subtotal = cart.items.reduce(
      (sum, i) => sum + i.totalItemPrice,
      0
    );

    cart.totalAmount = cart.subtotal + (cart.deliveryFee || 30);

    await cart.save();

    return res.json({
      success: true,
      message: "Cart updated",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
