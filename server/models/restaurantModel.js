import mongoose from "mongoose";
import Menu from "./menuModel";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 4.0,
        min:0,
        max: 5,
    },
    deliveryTime: {
        type: String
    },
    isVeg: {
        type: Boolean,
        default: false
    },
    location: {
        city: {
            type: String,
            required:true
        },
        address: {
            type: String
        },
    },
    image: {
        type: String,
        required: true
    },
    menu: [Menu],
    isOpen: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)

export default Restaurant