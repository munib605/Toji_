import { z } from 'zod'

const socialLinkSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url(),
})

export const updateAboutSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    shortBio: z.string().max(300).optional(),
    longBio: z.string().max(3000).optional(),
    resumeUrl: z.string().optional(),
    yearsOfExperience: z.number().min(0).optional(),
    location: z.string().max(150).optional(),
    availability: z.enum(['available', 'busy', 'unavailable']).optional(),
    socialLinks: z.array(socialLinkSchema).optional(),
  }),
})
