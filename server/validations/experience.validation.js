import { z } from 'zod'

export const createExperienceSchema = z.object({
  body: z.object({
    position: z.string({ required_error: 'Position is required' }).min(1).max(120),
    company: z.string({ required_error: 'Company is required' }).min(1).max(150),
    duration: z.string({ required_error: 'Duration is required' }).min(1).max(100),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().max(1000).optional().default(''),
    technologies: z.array(z.string()).optional().default([]),
    displayOrder: z.number().optional(),
  }),
})

export const updateExperienceSchema = z.object({
  body: createExperienceSchema.shape.body.partial(),
  params: z.object({ id: z.string().length(24, 'Invalid experience id') }),
})
