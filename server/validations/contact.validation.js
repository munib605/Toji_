import { z } from 'zod'

export const createContactMessageSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2).max(100),
    email: z.string({ required_error: 'Email is required' }).email('Please provide a valid email'),
    subject: z.string({ required_error: 'Subject is required' }).min(2).max(150),
    message: z.string({ required_error: 'Message is required' }).min(10).max(3000),
  }),
})

export const idParamSchema = z.object({
  params: z.object({ id: z.string().length(24, 'Invalid id') }),
})
