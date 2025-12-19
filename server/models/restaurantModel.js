import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String
    },
    rating: {
        type: Number,
        default: 4.0,
        min:0,
        max: 5,
    },
    deliveryTime: {
        type: String    ,
        required: true
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
            type: String,
            required:true,
        },
    },
    avatar: {
        type: String,
        required: true
    },
    menu: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Menu'
        }
    ],
    isOpen: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)

export default Restaurant