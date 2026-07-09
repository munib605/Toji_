import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { validate } from '../middleware/validate.middleware.js'
import { loginSchema } from '../validations/auth.validation.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimiter.middleware.js'

const router = Router()

router.post('/login', authLimiter, validate(loginSchema), authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)
router.get('/me', authenticate, authController.getProfile)

export default router
