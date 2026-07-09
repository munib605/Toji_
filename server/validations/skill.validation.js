import { z } from 'zod'

export const createSkillSchema = z.object({
  body: z.object({
    category: z.enum(['frontend', 'backend', 'database', 'tools', 'other'], {
      required_error: 'Category is required',
    }),
    name: z.string({ required_error: 'Skill name is required' }).min(1).max(80),
    icon: z.string().optional().default(''),
    percentage: z.number().min(0).max(100).optional(),
    displayOrder: z.number().optional(),
  }),
})

export const updateSkillSchema = z.object({
  body: createSkillSchema.shape.body.partial(),
  params: z.object({ id: z.string().length(24, 'Invalid skill id') }),
})
