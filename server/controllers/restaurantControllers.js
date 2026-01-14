import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";
import Restaurant from "../models/restaurantModel.js";
import User from "../models/userModel.js";

export const addRestaurant = async (req, res) => {
  try {
    if (!["seller", "admin"].includes(req.user.role)) {
      return res.json({
        success: false,
        message: "Only seller or admin can create restaurant",
      });
    }

    const { name, address, city, type, deliveryTime } = req.body;

    if (!name || !address || !city || !type || !deliveryTime) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
      return res.json({
        success: false,
        message: "Restaurant avatar file missing",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      return res.json({
        success: false,
        message: "Avatar upload failed",
      });
    }

    if (req.user.role === "seller") {
      const exists = await Restaurant.findOne({
        owner: req.user._id,
      });

      if (exists) {
        return res.json({
          success: false,
          message: "Seller can create only one restaurant",
        });
      }
    }

    const restaurant = await Restaurant.create({
      name,
      type,
      deliveryTime,
      city,
      address,
      avatar: avatar.url,
      owner: req.user._id,
    });

    return res.json({
      success: true,
      message: "Restaurant added successfully",
      restaurant,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const menu = await Menu.find({ restaurant: restaurant._id });

    return res.json({
      success: true,
      restaurant,
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    return res.json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

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
        message: "You cannot delete this restaurant",
      });
    }

    await Menu.deleteMany({ restaurant: id });
    await Restaurant.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRestaurantAvatar = async (req, res) => {
  try {
    const { id } = req.params;

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
        message: "Not allowed to modify this restaurant",
      });
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.json({
        success: false,
        message: "Avatar file is missing",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      return res.json({
        success: false,
        message: "Avatar upload failed",
      });
    }

    restaurant.avarat = avatar.url;
    await restaurant.save();

    return res.json({
      success: true,
      message: "Restaurant avatar updated",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
