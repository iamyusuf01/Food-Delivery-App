import express from 'express'
import {upload} from '../middlewares/multer.js'
import { addItems, deleteItem, updateItem } from '../controllers/menuController.js'
import auth, { authorizeRoles } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/add-item', authorizeRoles('admin', 'seller'), upload.fields([{ name: "image", maxCount: 1 }]), addItems)
router.put('/:itemId', authorizeRoles('admin', 'seller'),  updateItem)
router.delete('/:itemId', authorizeRoles('admin', 'seller'),  deleteItem)

export default router