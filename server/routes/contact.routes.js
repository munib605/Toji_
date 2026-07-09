import { Router } from 'express'
import * as contactController from '../controllers/contact.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createContactMessageSchema, idParamSchema } from '../validations/contact.validation.js'
import { contactLimiter } from '../middleware/rateLimiter.middleware.js'
import ROLES from '../constants/roles.js'

const router = Router()

// Public
router.post('/', contactLimiter, validate(createContactMessageSchema), contactController.submitContactMessage)

// Admin
router.get('/', authenticate, authorize(ROLES.ADMIN), contactController.getMessages)
router.get('/:id', authenticate, authorize(ROLES.ADMIN), validate(idParamSchema), contactController.getMessageById)
router.patch('/:id/read', authenticate, authorize(ROLES.ADMIN), validate(idParamSchema), contactController.markMessageAsRead)
router.patch(
  '/:id/replied',
  authenticate,
  authorize(ROLES.ADMIN),
  validate(idParamSchema),
  contactController.markMessageAsReplied,
)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), validate(idParamSchema), contactController.deleteMessage)

export default router
