import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {}
};

// export const updateUserProfile = async (req, res) => {
//   try {
//     const { email, phone, bio } = req.body;
//     if (!phone || !bio) {
//       return res.json({
//         success: false,
//         message: error.message,
//       });
//     }

//     const user = await User.findOne({ email });
//     if(!user){
//       return res.json({
//         success: false,
//         message: "User not found"
//       });
//     }
//     await user.save();

//     return res.json({
//       success: true,
//       message: 'Updated'
//     })
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateAccountDetails = async (req, res) => {
//   try {
//     const { name, email, phone, bio } = req.body;

//     if (!name && !email && !phone && !bio) {
//       return res.json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const updateUser = await User.findByIdAndUpdate(
//       req.user?._id,
//       {
//         $set: {
//           name,
//           email,
//           phone,
//           bio,
//         },
//       },
//       { new: true }
//     ).select("-password");

//     return res.json({
//       success: true,
//       message: "Account details updated",
//       updateUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateUserAvatar = async (req, res) => {
//   try {
//     const avatarLocalPath = req.files?.path;

//     if (!avatarLocalPath) {
//       return res.json({
//         success: false,
//         message: "Avatar files is missing",
//       });
//     }

//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatar.url) {
//       return res.json({
//         success: false,
//         message: "Error while uploading on avatar",
//       });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user?._id,
//       {
//         $set: {
//           avatar: avatar.url,
//         },
//       },
//       { new: true }
//     ).select("-password");

//     return res.json({
//       success: true,
//       message: "Avatar updated",
//     });
//   } catch (error) {}
// };
