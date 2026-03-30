import Cart from "../models/cartModel.js";

export const addProduct = async (req, res) => {
  try {
    const userId  = req.user._id;
    const { restaurantId, productId, quantity, price } = req.body;

    // Validation
    if (!restaurantId || !productId || quantity == null || price == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const qty = Number(quantity);
    if(qty < 1){
        return res.json({
            success: false,
            message: "Quantity must be at least 1",
        })
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
        cart.items[itemIndex].totalItemPrice = cart.items[itemIndex].quantity * cart.items[itemIndex].price;
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
      message: error.message
    });
  }
};
