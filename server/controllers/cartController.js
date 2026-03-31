import Cart from "../models/cartModel.js";

export const addProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { restaurantId, productId, quantity, price } = req.body;

    // Validation
    if (!restaurantId || !productId || quantity == null || price == null) {
      return res.status(400).json({
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
    // Find cart
    let cart = await Cart.findOne({ userId });

    if (cart && cart.restaurantId.toString() !== restaurantId) {
      return res.json({
        success: false,
        message: "You can only add products from one restaurant to the cart",
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
            quantity: qty,
            price,
            totalItemPrice: itemTotal,
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
          quantity: qty,
          price,
          totalItemPrice: qty * price,
        });
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
    });
  }
};

// export const clearCart = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     //find cart
//     const cart = await Cart.findOne({ userId });
//     //check if cart exists
//     if (!cart) {
//       return res.json({
//         success: true,
//         message: "Cart is already empty",
//         cart: {
//           items: [],
//           subtotal: 0,
//           totalAmount: 0,
//         },
//       });
//     }
//     //clear cart items
//     cart.items = [];
//     cart.subtotal = 0;
//     cart.totalAmount = 0;
//     cart.restaurantId = null;

//     await cart.save();

//     return res.status(200).json({
//       success: true,
//       message: "Cart cleared successfully",
//       cart,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error clearing cart" || error.message,
//     });
//   }
// };

export const removeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId });

    // ✅ If no cart → return empty
    if (!cart) {
      return res.status(200).json({
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

    // ✅ Find item index safely
    const itemIndex = cart.items.findIndex(
      (item) => item.productId?.toString() === pid
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // ✅ Remove item
    cart.items.splice(itemIndex, 1);

    // ✅ Reset restaurant if empty
    if (cart.items.length === 0) {
      cart.restaurantId = null;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      cart,
    });

  } catch (error) {
    console.error("REMOVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.user;
    const { quantity } = req.body;

    const qty = Number(quantity);

    // Validation
    if (!qty || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.json({
        success: false,
        message: "Product not found in cart",
      });
    }
    // Update quantity
    cart.items[itemIndex].quantity = qty;

    await cart.save();

    return res.json({
      success: true,
      message: "Product quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating product quantity",
    });
  }
};
