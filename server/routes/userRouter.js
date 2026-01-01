import express from "express";
import {
  addAddress,
  getUserData,
  paymentInstance,
  updateAccountDetails,
  uploadAvatar,
} from "../controllers/userController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";
import { updateUserRole } from "../controllers/authController.js";

const router = express.Router();

router.get("/:id", auth, getUserData);
router.patch("/update-account", auth, updateAccountDetails);
router.post("/avatar", auth,  upload.single("avatar"), uploadAvatar);
router.post('/address', auth, addAddress)
router.patch('/update-role', auth, authorizeRoles("admin"), updateUserRole)
router.post('/payment', auth, paymentInstance)


export default router;
