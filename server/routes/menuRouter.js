import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  addItems,
  deleteItem,
  getAllMenu,
  getMenuByRestaurant,
  updateItem,
} from "../controllers/menuController.js";
import auth, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-menu/:id", getMenuByRestaurant);
router.get("/all-menu", getAllMenu);

router.post(
  "/add-item/:id",
  auth,
  authorizeRoles("admin", "seller"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  addItems
);
router.put(
  "/update/:id",
  auth,
  authorizeRoles("admin", "seller"),
  upload.single("image"),
  updateItem
);
router.delete("/delete/:id", auth, authorizeRoles("admin", "seller"), deleteItem);

export default router;
