import { z } from 'zod'

export const createReviewSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(1).max(100),
    email: z.string().email('Please provide a valid email').optional(),
    company: z.string().optional().default(''),
    country: z.string().optional().default(''),
    rating: z.number({ required_error: 'Rating is required' }).min(1).max(5),
    review: z.string({ required_error: 'Review message is required' }).min(10).max(1000),
  }),
})

export const updateReviewSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).max(100).optional(),
      company: z.string().optional(),
      country: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
      review: z.string().min(10).max(1000).optional(),
      isApproved: z.boolean().optional(),
    })
    .partial(),
  params: z.object({ id: z.string().length(24, 'Invalid review id') }),
})
