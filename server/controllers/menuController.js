import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";
import { MongoCryptKMSRequestNetworkTimeoutError } from "mongodb";
import mongoose from "mongoose";

export const addItems = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { id } = req.params;

    if (!name || !price || !description) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (
      req.user.role === "seller" &&
      restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.json({
        success: false,
        message: "You cannot add menu to this restuarant",
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

    // const lastItem = await Menu.findOne({ restaurant: restaurantId })
    //   .sort({ itemId: -1 })
    //   .select("itemId");

    // const nextItemId = lastItem ? lastItem.itemId + 1 : 101;

    const menu = await Menu.create({
      // itemId: nextItemId,
      restaurant: id,
      name,
      price,
      description,
      image: image.url,
    });

    restaurant.menu.push(menu._id);
    await restaurant.save();

    return res.json({
      success: true,
      message: " Menu item Added Successfully",
      menu,
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
    const { name, description, price } = req.body;
    const { id } = req.params;
    if (!name || !description || !price) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      return res.json({
        success: false,
        message: "image file is missing",
      });
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image.url) {
      return res.json({
        success: false,
        message: "Image upload failed",
      });
    }

    const menu = await Menu.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image: image.url,
      },
      { new: true }
    );

    if (
      req.user?.role === "seller" &&
      menu.restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.json({
        success: false,
        message: "Not allowed to update this menu item",
      });
    }

    if (!menu) {
      return res.json({
        success: false,
        message: "Menu item not found for this restaurant",
      });
    }

    return res.json({
      success: true,
      message: "Menu Item updated Successfully",
      menu,
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
    const { id } = req.params;

    const menu = await Menu.findById(id).populate("restaurant");
    if (!menu) {
      return res.json({
        success: false,
        message: "Menu item not founds",
      });
    }

    if (
      req.user.role === "seller" &&
      menu.restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.json({
        success: false,
        message: "Not allowed to delete this menu item",
      });
    }

    await Restaurant.findByIdAndUpdate(menu.restaurant._id, {
      $pull: { menu: menu._id },
    });

    await Menu.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        success: false,
        message: "Invalid restaurant id",
      });
    }
    const menu = await Menu.find({ restaurant: id });
    if (!menu.length) {
      return res.json({
        success: false,
        message: "No menu found for this restaurant",
      });
    }

    return res.json({
      success: true,
      count: menu.length,
      menu,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find().populate("restaurant");

    return res.json({
      success: true,
      menu,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
