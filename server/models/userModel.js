import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null
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
  phone: {
    type: Number,
    unique: true,
    default: 0
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    address: {
      type: String,
      default: ''
    },
    street: {
      type: String,
      default: ''

    },
    postCode: {
      type: String,
      default: 0
    },
    appartment: {
      type: Number,
      default: 0,
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
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
