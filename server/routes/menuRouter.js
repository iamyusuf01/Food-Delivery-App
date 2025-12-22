import express from 'express'
import {upload} from '../middlewares/multer.js'
import { addItems } from '../controllers/menuController.js'
import auth, { authorizeRoles } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/add-item', authorizeRoles('admin', 'seller'), upload.fields([{ name: "image", maxCount: 1 }]), addItems)

export default router