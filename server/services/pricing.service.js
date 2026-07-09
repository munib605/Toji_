import pricingRepository from '../repositories/pricing.repository.js'
import createBaseService from './base.service.js'

export const pricingService = {
  ...createBaseService(pricingRepository, 'Pricing'),

  async list({ activeOnly = false } = {}) {
    return activeOnly ? pricingRepository.findActiveOrdered() : pricingRepository.model.find().sort({ displayOrder: 1 }).lean()
  },
}

export default pricingService
