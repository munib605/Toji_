import { Router } from 'express'
import * as experienceController from '../controllers/experience.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createExperienceSchema, updateExperienceSchema } from '../validations/experience.validation.js'
import ROLES from '../constants/roles.js'

const router = Router()

router.get('/', experienceController.getExperience)

router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createExperienceSchema),
  experienceController.createExperience,
)
router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  validate(updateExperienceSchema),
  experienceController.updateExperience,
)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), experienceController.deleteExperience)

export default router
