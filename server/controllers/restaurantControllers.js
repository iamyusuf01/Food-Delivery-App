import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";
import Restaurant from "../models/restaurantModel.js";

export const addRestaurant = async (req, res) => {
  try {
    if (typeof req.body.location === "string") {
      req.body.location = JSON.parse(req.body.location);
    }
    const { name, location, type, deliveryTime } = req.body;

    if (!name || !type || !deliveryTime ) {
      return res.json({
        success: true,
        message: "All fields are required",
      });
    }

    const { city, address } = location;

    if ( !location.city || !location.address) {
      return res.json({
        success: false,
        message: "City and address are required",
      });
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
      return res.json({
        success: false,
        message: "Avatar file missing",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      return res.json({
        success: false,
        message: "Avatar upload failed",
      });
    }

    const restaurant = await Restaurant.create({
      name,
      type,
      deliveryTime,
      location: {
        city,
        address,
      },
      avatar: avatar.url,
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
    const { restaurantId } = req.body;
    if (!restaurantId) {
      return res.json({
        success: false,
        message: "Restaurant Id required",
      });
    }
    const restaurants = await Restaurant.findById(restaurantId).populate(
      "menu"
    );
    if (!restaurants) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.json({
      success: true,
      message: "Fetching restaurants successfully",
      restaurants
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
    const restaurants = await Restaurant.find().populate(
      "menu"
    );
    if (!restaurants) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.json({
      success: true,
      message: "Fetching all restaurants successfully",
      restaurants
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
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.json({
        success: false,
        message: "Restaurant Id required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if(restaurant.menu?.length){
      await Menu.deleteMany({_id: {$in: restaurant.menu}});
    }

    await Restaurant.findByIdAndDelete(restaurantId)
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

export const updateAvatar = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.json({
        success: false,
        message: "Unauthorized user",
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

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: avatar.url,
        },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res.json({
      success: true,
      message: "Avatar updated",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


