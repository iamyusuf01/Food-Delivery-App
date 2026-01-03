import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";
import { MongoCryptKMSRequestNetworkTimeoutError } from "mongodb";

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

    if (
      req.user._id === "seller" &&
      restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.json({
        success: false,
        message: "You cannot add menu tp this restuarant",
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
    const { name, description, price } = req.body;
    const { itemId } = req.params;
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
      itemId,
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
    const { itemId } = req.params;
    // const { restaurantId } = req.body;

    // if (!itemId || !restaurantId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "itemId and restaurantId are required",
    //   });
    // }

    const menu = await Menu.findById(itemId).populate("restaurant");
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
    const menuItem = await Menu.findByIdAndDelete(itemId);

    return res.json({
      success: true,
      message: "Menu item deleted successfully",
      menuItem,
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
    const { restaurantId } = req.params;
    const menu = await Menu.find({ restaurant: restaurantId });

    return res.json({
      success: true,
      menu,
    });
  } catch (error) {}
};
