import { Router } from 'express'
import * as pricingController from '../controllers/pricing.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'
import { validate } from '../middleware/validate.middleware.js'
import { createPricingSchema, updatePricingSchema } from '../validations/pricing.validation.js'
import ROLES from '../constants/roles.js'

const router = Router()

router.get('/', pricingController.getPricing)

router.post('/', authenticate, authorize(ROLES.ADMIN), validate(createPricingSchema), pricingController.createPricing)
router.put('/:id', authenticate, authorize(ROLES.ADMIN), validate(updatePricingSchema), pricingController.updatePricing)
router.delete('/:id', authenticate, authorize(ROLES.ADMIN), pricingController.deletePricing)

export default router
