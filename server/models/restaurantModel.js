import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    cuisines: [
      {
        type: String,
        required: true,
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      pincode: String,
    },

    avatar: {
      type: String,
      required: true,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// 🔥 Indexes
restaurantSchema.index({ isActive: 1, isOpen: 1 });
restaurantSchema.index({ name: "text", cuisines: "text" });

const Restaurant =
  mongoose.models.Restaurant ||
  mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;