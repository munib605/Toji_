import mongoose from 'mongoose'

const pricingSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: [true, 'Service name is required'], trim: true, maxlength: 120 },
    category: { type: String, trim: true, default: 'general' },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    startingPrice: { type: Number, required: [true, 'Starting price is required'], min: 0 },
    currency: { type: String, default: 'USD' },
    deliveryTime: { type: String, trim: true, default: '' },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
    isHighlighted: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

pricingSchema.index({ isActive: 1, displayOrder: 1 })

export const Pricing = mongoose.model('Pricing', pricingSchema)
export default Pricing
