import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";
import mongoose from "mongoose";

export const addItems = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!["seller", "admin"].includes(req.user.role)) {
      return res.json({
        success: false,
        message: "Only seller or admin can add items",
      });
    }

    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.json({
        success: false,
        message: "First create restaurant",
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

    const menu = await Menu.create({
      name,
      price,
      description,
      image: image.url,
      restaurant: restaurant._id,
      createdBy: req.user._id,
    });

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
    const { menuItem } = req.params;
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
      menuItem,
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
    const { menuItem } = req.params;

    const menu = await Menu.findById(menuItem).populate("restaurant");
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
    const restaurant = await Restaurant.findOne({
      owner: res.user._id,
    });

    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }
    const menu = await Menu.find({ restaurant: restaurant_.id });
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

export const getCurrentMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id).populate("restaurant");

    if (!menu) {
      return res.json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
