import { z } from 'zod'

export const createPricingSchema = z.object({
  body: z.object({
    serviceName: z.string({ required_error: 'Service name is required' }).min(1).max(120),
    category: z.string().optional().default('general'),
    description: z.string().max(500).optional().default(''),
    startingPrice: z.number({ required_error: 'Starting price is required' }).min(0),
    currency: z.string().optional().default('USD'),
    deliveryTime: z.string().optional().default(''),
    technologies: z.array(z.string()).optional().default([]),
    features: z.array(z.string()).optional().default([]),
    isActive: z.boolean().optional(),
    isHighlighted: z.boolean().optional(),
    displayOrder: z.number().optional(),
  }),
})

export const updatePricingSchema = z.object({
  body: createPricingSchema.shape.body.partial(),
  params: z.object({ id: z.string().length(24, 'Invalid pricing id') }),
})
