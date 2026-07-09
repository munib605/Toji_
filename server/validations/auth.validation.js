import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Please provide a valid email'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  }),
})

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }).min(2).max(100),
    email: z.string({ required_error: 'Email is required' }).email('Please provide a valid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[0-9]/, 'Password must contain a number'),
  }),
})
