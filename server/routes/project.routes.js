import { Router } from 'express'
import * as projectController from '../controllers/project.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createProjectSchema, updateProjectSchema, idParamSchema } from '../validations/project.validation.js'
import { uploadProjectImages } from '../middleware/upload.middleware.js'
import { parseJsonFields } from '../middleware/parseJsonFields.middleware.js'
import ROLES from '../constants/roles.js'

const router = Router()

// Public
router.get('/', projectController.getProjects)
router.get('/featured', projectController.getFeaturedProjects)
router.get('/:id', validate(idParamSchema), projectController.getProjectById)

// Admin only
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  uploadProjectImages,
  parseJsonFields(['technologies', 'features']),
  validate(createProjectSchema),
  projectController.createProject,
)

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  uploadProjectImages,
  parseJsonFields(['technologies', 'features']),
  validate(updateProjectSchema),
  projectController.updateProject,
)

router.delete('/:id', authenticate, authorize(ROLES.ADMIN), validate(idParamSchema), projectController.deleteProject)

export default router
