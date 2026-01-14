import Restaurant from "../models/restaurantModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Menu from "../models/menuModel.js";

export const addItems = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only seller and admin can add items",
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
    ).populate("restaurant");

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

    const menu = await Menu.findById(itemId).populate("restaurant");
    if (!menu) {
      return res.json({
        success: false,
        message: "Menu item not found",
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

export const getMyMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found. Create restaurant first",
      });
    }
    const menu = await Menu.find({ restaurant: restaurant._id });

    return res.json({
      success: true,
      restaurant,
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
    const { itemId } = req.params;

    if (!itemId) {
      return res.json({
        success: false,
        message: "Item id not found",
      });
    }

    const menu = await Menu.findById(itemId).populate("restaurant");

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
export const getSellerFoodDetails = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.json({
        success: false,
        message: "Invalid menu id",
      });
    }

    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not  found",
      });
    }

    const menu = await Menu.findById(itemId).populate("restaurant");

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
