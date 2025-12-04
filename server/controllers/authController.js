import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";

//User Registration
export const register = async (req, res) => {
  //fetchin the data from request body
  try {
    const { name, email, password } = req.body;
    //check Validation
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    //check User Exists aur Not
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    // Protect Password Using Bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //Create User in DataBase
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    //Create Token and store in Cookies
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Send Confirmation Email to User
    const mailOption = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to food Delivery App",
      text: `Welcome to our website. Your registration was successfully`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    // return Success response
    return res.json({
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//User Login
export const login = async (req, res) => {
  //fetching user from req body
  try {
    const { email, password } = req.body;
    //check validation
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    //
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User login successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//LogOut
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//VerifyOtp
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    const otp = String(Math.floor(1000 + Math.random() * 9000));
    user.resetOtp = otp;
    user.verifyOtpExpired = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const sendOtpToMail = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for reseting your password is ${otp}.
            Use this OTP to proceed with reseting your password.`,
    };

    transporter.sendMail(sendOtpToMail, (error, info) => {
      if (error) {
        console.error("Error sending otp:", error);
      } else {
        console.log("OTP sent successfully:", info.response);
      }
    });

    return res.json({
      success: true,
      message: "Otp send to your email",
      otp: otp,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//forget password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid otp and user not found",
      });
    }

    if (user.resetOtpExpireAt > Date.now()) {
      return res.json({
        success: false,
        message: "Otp Expired",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Reset password succcessfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Authenticate
export const isAuthenticate = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "User is authenticated",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
