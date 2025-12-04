import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    verifyOtp: {
        type: Number,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }

})

 const User = mongoose.model.User || mongoose.model('User', userSchema)

export  default User