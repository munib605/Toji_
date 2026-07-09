import Pricing from '../models/Pricing.model.js'
import BaseRepository from './base.repository.js'

class PricingRepository extends BaseRepository {
  constructor() {
    super(Pricing)
  }

  findActiveOrdered() {
    return this.model.find({ isActive: true }).sort({ displayOrder: 1 }).lean()
  }
}

export const pricingRepository = new PricingRepository()
export default pricingRepository
