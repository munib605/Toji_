import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

/**
 * All environment variables are parsed and validated once, at boot time.
 * If a required variable is missing or malformed, the process fails fast
 * with a clear message instead of surfacing a cryptic error later.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  API_PREFIX: z.string().default('/api'),

  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  MONGO_URI_TEST: z.string().optional(),

  JWT_ACCESS_SECRET: z.string().min(10, 'JWT_ACCESS_SECRET must be set'),
  JWT_REFRESH_SECRET: z.string().min(10, 'JWT_REFRESH_SECRET must be set'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  COOKIE_DOMAIN: z.string().default('localhost'),

  ADMIN_NAME: z.string().default('Admin'),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().optional(),

  CLOUDINARY_CLOUD_NAME: z.string().optional().default(''),
  CLOUDINARY_API_KEY: z.string().optional().default(''),
  CLOUDINARY_API_SECRET: z.string().optional().default(''),

  SMTP_HOST: z.string().optional().default(''),
  SMTP_PORT: z.coerce.number().default(587),
  // SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_SECURE: z
  .string()
  .optional()
  .default('false')
  .transform((val) => val === 'true'),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASSWORD: z.string().optional().default(''),
  EMAIL_FROM: z.string().optional().default('no-reply@example.com'),
  OWNER_EMAIL: z.string().optional().default(''),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().default(5),

  LOG_LEVEL: z.string().default('info'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

const env = parsed.data

export default {
  nodeEnv: env.NODE_ENV,
  isProd: env.NODE_ENV === 'production',
  isDev: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  port: env.PORT,
  clientUrl: env.CLIENT_URL,
  apiPrefix: env.API_PREFIX,

  mongoUri: env.NODE_ENV === 'test' ? env.MONGO_URI_TEST || env.MONGO_URI : env.MONGO_URI,

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  cookieDomain: env.COOKIE_DOMAIN,

  admin: {
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  },

  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
  },

  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    from: env.EMAIL_FROM,
    ownerEmail: env.OWNER_EMAIL,
  },

  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    contactMax: env.CONTACT_RATE_LIMIT_MAX,
  },

  logLevel: env.LOG_LEVEL,
}
