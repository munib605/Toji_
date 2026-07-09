import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import pricingService from '../services/pricing.service.js'
import createBaseController from './base.controller.js'

const base = createBaseController(pricingService, 'Pricing')

export const getPricing = asyncHandler(async (req, res) => {
  const activeOnly = req.query.activeOnly !== 'false'
  const items = await pricingService.list({ activeOnly })
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Pricing'), items).send(res)
})

export const { create: createPricing, update: updatePricing, remove: deletePricing } = base
