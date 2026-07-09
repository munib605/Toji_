import { Router } from 'express'
import * as skillController from '../controllers/skill.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createSkillSchema, updateSkillSchema } from '../validations/skill.validation.js'
import ROLES from '../constants/roles.js'

const router = Router()

router.get('/', skillController.getSkills)

router.post('/', authenticate, authorize(ROLES.ADMIN), validate(createSkillSchema), skillController.createSkill)
router.put('/:id', authenticate, authorize(ROLES.ADMIN), validate(updateSkillSchema), skillController.updateSkill)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), skillController.deleteSkill)

export default router
