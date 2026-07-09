import { Router } from 'express'
import * as dashboardController from '../controllers/dashboard.controller.js'

const router = Router()

// Public — these are aggregate counts only (no PII), displayed on the
// portfolio's own analytics section for visitors.
router.get('/stats', dashboardController.getDashboardStats)

export default router
