import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const  token  = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized to access, Please try again",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(tokenDecode?._id).select('-password -refreshToken')

    if(!user){
      return res.json({
        success: false,
        message: 'Invalid Access Token'
      })
    }

    req.user = user
    next();
  } catch (error) {
    console.log(error);
    return res.json({
        success: false,
        message: error.message
    })
  }
};


export default auth