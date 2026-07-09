import { Router } from 'express'
import authRoutes from './auth.routes.js'
import projectRoutes from './project.routes.js'
import skillRoutes from './skill.routes.js'
import experienceRoutes from './experience.routes.js'
import pricingRoutes from './pricing.routes.js'
import reviewRoutes from './review.routes.js'
import aboutRoutes from './about.routes.js'
import contactRoutes from './contact.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import healthRoutes from './health.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/skills', skillRoutes)
router.use('/experience', experienceRoutes)
router.use('/pricing', pricingRoutes)
router.use('/reviews', reviewRoutes)
router.use('/about', aboutRoutes)
router.use('/contact', contactRoutes)
router.use('/dashboard', dashboardRoutes)

export default router
