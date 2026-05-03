import mongoose from "mongoose";

const ORDER_STATUS = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalItemPrice: {
      type: Number,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(val) => val.length > 0, "Order must have at least one item"],
    },

    address: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
    },

    subtotal: Number,

    deliveryFee: {
      type: Number,
      default: 0,
    },

    totalAmount: Number,

    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "PLACED",
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"], // ✅ FIXED
      default: "PENDING",
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    statusTimeline: {
      type: [
        {
          status: {
            type: String,
            enum: ORDER_STATUS,
          },
          time: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

orderSchema.pre("validate", function () {
  this.subtotal = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  this.totalAmount = this.subtotal + (this.deliveryFee || 0);
});

orderSchema.pre("save", function () {
  if (this.isModified("status")) {
    this.statusTimeline.push({
      status: this.status,
      time: new Date(),
    });
  }
});

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, status: 1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
