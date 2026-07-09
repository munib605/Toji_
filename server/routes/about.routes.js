import { Router } from 'express'
import * as aboutController from '../controllers/about.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { updateAboutSchema } from '../validations/about.validation.js'
import ROLES from '../constants/roles.js'

const router = Router()

router.get('/', aboutController.getAbout)
router.put('/', authenticate, authorize(ROLES.ADMIN), validate(updateAboutSchema), aboutController.updateAbout)

export default router
