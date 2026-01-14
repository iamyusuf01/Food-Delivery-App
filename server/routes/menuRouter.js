import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  addItems,
  deleteItem,
  getAllMenu,
  getCurrentMenu,
  getMenuByRestaurant,
  updateItem,
} from "../controllers/menuController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-menu", getMenuByRestaurant);
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
