import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
