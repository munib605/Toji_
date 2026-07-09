import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'

import env from './config/env.js'
import logger from './config/logger.js'
import routes from './routes/index.js'
import { sanitizeInput } from './middleware/sanitize.middleware.js'
import { apiLimiter } from './middleware/rateLimiter.middleware.js'
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js'

const app = express()

// Trust the first proxy hop (Render/Railway/Nginx) so req.ip and secure
// cookies behave correctly behind a load balancer.
app.set('trust proxy', 1)

// ── Security ──────────────────────────────────────────────
app.use(helmet())
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(mongoSanitize()) // strips keys starting with `$` or containing `.`

// ── Body parsing ──────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())
app.use(sanitizeInput)

// ── Performance ───────────────────────────────────────────
app.use(compression())

// ── Logging ───────────────────────────────────────────────
app.use(
  morgan(env.isProd ? 'combined' : 'dev', {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
)

// ── Rate limiting (applied to the whole API surface) ───────
app.use(env.apiPrefix, apiLimiter)

// ── Routes ────────────────────────────────────────────────
app.use(env.apiPrefix, routes)

app.get('/', (req, res) => {
  res.json({ name: 'Portfolio API', status: 'running', docs: `${env.apiPrefix}/health` })
})

// ── 404 + centralized error handling ───────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
