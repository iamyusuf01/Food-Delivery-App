import express from "express";
import { isAuthenticate, login, logout, refreshAccessToken, register, resetPassword, sendResetOtp, updateUserRole } from "../controllers/authController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register',  register);
router.post('/login', login)

router.post('/logout', auth, logout)
router.post('refresh-token', refreshAccessToken)

router.post('/send-reset-otp',  sendResetOtp)
router.post('/change-password', resetPassword)
router.post('/is-auth', auth, isAuthenticate)


export default router;