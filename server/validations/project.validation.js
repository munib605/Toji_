import { z } from 'zod'

const urlOrEmpty = z
  .string()
  .trim()
  .refine((val) => val === '' || /^https?:\/\/.+/.test(val), 'Must be a valid URL')
  .optional()

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(2).max(150),
    description: z.string({ required_error: 'Description is required' }).min(10).max(2000),
    technologies: z.array(z.string()).optional().default([]),
    features: z.array(z.string()).optional().default([]),
    githubUrl: urlOrEmpty,
    liveUrl: urlOrEmpty,
    category: z.enum(['fullstack', 'frontend', 'backend', 'mobile', 'ai', 'other']).optional(),
    isFeatured: z.boolean().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    displayOrder: z.number().optional(),
  }),
})

export const updateProjectSchema = z.object({
  body: createProjectSchema.shape.body.partial(),
  params: z.object({ id: z.string().length(24, 'Invalid project id') }),
})

export const idParamSchema = z.object({
  params: z.object({ id: z.string().length(24, 'Invalid id') }),
})
