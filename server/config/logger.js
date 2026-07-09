import winston from 'winston'
import env from './env.js'

const { combine, timestamp, printf, colorize, errors, json } = winston.format

const devFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, stack }) => `[${ts}] ${level}: ${stack || message}`),
)

const prodFormat = combine(timestamp(), errors({ stack: true }), json())

// Serverless platforms (Vercel, Lambda, etc.) have a read-only filesystem —
// only /tmp is writable, and it isn't persisted between invocations, so
// file transports are pointless there. We detect that and log to stdout
// only; Vercel captures stdout/stderr into its own log viewer anyway.
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

const logger = winston.createLogger({
  level: env.logLevel,
  format: env.isProd ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    ...(env.isProd && !isServerless
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
  exitOnError: false,
})

export default logger
