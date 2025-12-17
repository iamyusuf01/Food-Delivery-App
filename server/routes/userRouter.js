import express from "express";
import {
  getUserData,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id", getUserData);
router.patch("/update-account", updateAccountDetails);
router.patch("/avatar",  upload.single('avatar'), updateUserAvatar);

export default router;
