import express from "express";
import {
  addAddress,
  getAllUsers,
  getUserData,
  paymentInstance,
  updateAccountDetails,
  uploadAvatar,
} from "../controllers/userController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
import { updateUserRole } from "../controllers/authController.js";

const router = express.Router();

router.get("/data", auth, getUserData);
router.get("/all-users", auth, authorizeRoles("admin"),  getAllUsers);
router.put(
  "/update-account",
  auth,
  upload.single("avatar"),
  updateAccountDetails
);
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);
router.post("/address", auth, addAddress);
router.put("/update-role", auth, authorizeRoles("admin"), updateUserRole);
router.get("/payment", paymentInstance);

export default router;
