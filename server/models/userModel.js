import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      postCode: {
        type: Number,
        default: 0,
        required: true,
      },
      appartment: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    verifyOtp: {
      type: Number,
      default: 0,
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
    },
    resetOtp: {
      type: Number,
      default: 0,
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },
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
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
