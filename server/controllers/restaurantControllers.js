import { uploadOnCloudinary } from "../config/cloudinary.js";
import Restaurant from "../models/restaurantModel.js";

export const addRestaurant = async (req, res) => {
  try {
    if (typeof req.body.location === "string") {
      req.body.location = JSON.parse(req.body.location);
    }
    const { name, location, type, deliveryTime } = req.body;

    if (!name || !type || !deliveryTime || !location) {
      return res.json({
        success: true,
        message: "All fields are required",
      });
    }

    const { city, address } = location;

    if (!city || !address) {
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
