import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import stripe from "../config/stripe.js";

export const getUserData = async (req, res) => {
  try {
    // const { userId } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user?.bio,
        location: user?.location,
        avatar: user?.avatar,
        phone: user?.phone,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAccountDetails = async (req, res) => {
  try {
    const { name, email, phone, bio } = req.body;

    if (!name || !email || !phone || !bio) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    let avatarLocalPath = req.file?.path;

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

    const user = await User.findByIdAndUpdate(req.user?._id, {
      name,
      email,
      phone,
      bio,
      avatar: avatar.url
    }, {new: true}).select("-password -refreshToken");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Account details updated",
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

export const uploadAvatar = async (req, res) => {
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

export const addAddress = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.json({
        success: false,
        message: "location data is required",
      });
    }
    const { address, street, postCode, appartment } = location;

    if (!address?.trim() || !street?.trim() || !postCode || !appartment) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        location: {
          address,
          street,
          postCode,
          appartment,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Address Updated Successfully",
      location: user.location,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      mnessage: error.message,
    });
  }
};

export const paymentInstance = async (req, res) => {
  try {
    const { amount, email } = req.body;

    // amount must be in paise (₹25 = 2500)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Your Food Order",
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
