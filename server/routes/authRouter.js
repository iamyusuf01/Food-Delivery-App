import express from "express";
import { isAuthenticate, login, logout, register, resetPassword, sendResetOtp } from "../controllers/authController.js";
import auth from "../middlewares/authMiddleware.js";


const authRouter = express.Router();

authRouter.post('/register',  register);
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/change-password', resetPassword)
authRouter.post('/is-auth', auth, isAuthenticate)

export default authRouter;