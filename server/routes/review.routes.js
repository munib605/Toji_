import { Router } from 'express'
import * as reviewController from '../controllers/review.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createReviewSchema, updateReviewSchema } from '../validations/review.validation.js'
import { uploadSingleImage } from '../middleware/upload.middleware.js'
import { contactLimiter } from '../middleware/rateLimiter.middleware.js'
import ROLES from '../constants/roles.js'

const router = Router()

// Public
router.get('/', reviewController.getApprovedReviews)
router.post(
  '/',
  contactLimiter,
  uploadSingleImage('profileImage'),
  validate(createReviewSchema),
  reviewController.submitReview,
)

// Admin
router.get('/all', authenticate, authorize(ROLES.ADMIN), reviewController.getReviews)
router.patch('/:id/approve', authenticate, authorize(ROLES.ADMIN), reviewController.approveReview)
router.put('/:id', authenticate, authorize(ROLES.ADMIN), validate(updateReviewSchema), reviewController.updateReview)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), reviewController.deleteReview)

export default router
