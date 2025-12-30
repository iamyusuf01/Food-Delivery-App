import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";

export const addItems = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { restaurantId } = req.params;

    if (!name || !price || !description) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const imageLocalPath = req.files?.image?.[0]?.path;
    if (!imageLocalPath) {
      return res.json({
        success: false,
        message: "Image file missing",
      });
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image?.url) {
      return res.json({
        success: false,
        message: "image upload failed",
      });
    }

    const lastItem = await Menu.findOne({ restaurant: restaurantId })
      .sort({ itemId: -1 })
      .select("itemId");

    const nextItemId = lastItem ? lastItem.itemId + 1 : 101;

    const menuItem = await Menu.create({
      itemId: nextItemId,
      restaurant: restaurantId,
      name,
      price,
      description,
      image: image.url,
    });

    restaurant.menu.push(menuItem._id);
    await restaurant.save();

    return res.json({
      success: true,
      message: "Item Added Successfully",
      menuItem,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, description, price, restaurantId } = req.body;
    const { itemId } = req.params;
    if (!name || !description || !price) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not founds",
      });
    }
    const menuItem = await Menu.findByIdAndUpdate(
      { _id: itemId, restaurant: restaurantId },
      {
        name,
        description,
        price,
        restaurant: restaurantId,
      },
      { new: true }
    );

    if (!menuItem) {
      return res.json({
        success: false,
        message: "Menu item not found for this restaurant",
      });
    }

    return res.json({
      success: true,
      message: "Item updated Successfully",
      menuItem,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { restaurantId } = req.body;

    if (!itemId || !restaurantId) {
      return res.status(400).json({
        success: false,
        message: "itemId and restaurantId are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "restaurant Id not found",
      });
    }
    const menu = await Menu.findByIdAndDelete({
      _id: itemId,
      restaurant: restaurantId,
    });

    return res.json({
      success: true,
      message: "Menu item deleted successfully",
      menu,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
