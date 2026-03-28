import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    avatar: { type: String, default: "" },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: { type: String, required: true },

    refreshToken: String,

    phone: {
      type: String,
      unique: true,
    },

    bio: { type: String, default: "" },

    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    location: {
      address: { type: String, default: "" },
      street: { type: String, default: "" },
      pincode: { type: String, default: "" },
      apartment: { type: String, default: "" },
    },

    verifyOtp: Number,
    verifyOtpExpireAt: Date,

    resetOtp: Number,
    resetOtpExpireAt: Date,
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;