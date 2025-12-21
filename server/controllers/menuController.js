import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";

export const addItems = async (req, res) => {
  try {
    const { restaurantId, name, price, description } = req.body;

    if (!restaurantId || !name || price === undefined || !description) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId)
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
