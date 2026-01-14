import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  addItems,
  deleteItem,
  getAllMenu,
  getCurrentMenu,
  getMyMenu,
  getSellerFoodDetails,
  updateItem,
} from "../controllers/menuController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my-food-list", auth, authorizeRoles("seller", "admin"), getMyMenu);
router.get("/seller/:itemId", auth, authorizeRoles("seller", "admin"), getSellerFoodDetails);
router.get("/all-menu", getAllMenu);
router.get("/current-menu/:itemId", getCurrentMenu);

router.post(
  "/add-item",
  auth,
  authorizeRoles("admin", "seller"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItems
);
router.put(
  "/update/:menuItem",
  auth,
  authorizeRoles("admin", "seller"),
  upload.single("image"),
  updateItem
);
router.delete(
  "/delete/:menuItem",
  auth,
  authorizeRoles("admin", "seller"),
  deleteItem
);

export default router;
