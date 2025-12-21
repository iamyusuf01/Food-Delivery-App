import express from 'express'
import {upload} from '../middlewares/multer.js'
import { addItems } from '../controllers/menuController.js'
const router = express.Router()

router.post('/add-item', upload.fields([{ name: "image", maxCount: 1 }]), addItems)

export default router