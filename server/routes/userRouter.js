import express from "express";
import {
  getUserData,
  updateAccountDetails,
  uploadAvatar,
} from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id", auth, getUserData);
router.patch("/update-account", auth, updateAccountDetails);
router.post("/avatar", auth,  upload.single("avatar"), uploadAvatar);

export default router;
