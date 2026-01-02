import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const  token  = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized to access, Please try again",
      });
    }

    let tokenDecode;
    try {
      tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Access Token'
      });
    }

    const user = await User.findById(tokenDecode?._id).select('-password -refreshToken')

    if(!user){
      return res.status(401).json({
        success: false,
        message: 'Invalid Access Token'
      })
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: error.message
    })
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req.user || !allowedRoles.includes(req.user.role)){
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permission"
      })
    }
    next();
  }
}


export default auth