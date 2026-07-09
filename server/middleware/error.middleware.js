import { ZodError } from 'zod'
import mongoose from 'mongoose'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import logger from '../config/logger.js'
import env from '../config/env.js'
import MESSAGES from '../constants/messages.js'

/**
 * Normalizes known error shapes (Mongoose validation, duplicate keys, JWT,
 * Zod, Multer) into a consistent ApiError before responding. Any error that
 * reaches here without being operational is logged with its full stack and
 * masked from the client in production.
 */
function normalizeError(err) {
  if (err instanceof ApiError) return err

  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({ field: e.path.join('.'), message: e.message }))
    return ApiError.unprocessable(MESSAGES.GENERIC.VALIDATION_ERROR, details)
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }))
    return ApiError.unprocessable(MESSAGES.GENERIC.VALIDATION_ERROR, details)
  }

  if (err instanceof mongoose.Error.CastError) {
    return ApiError.badRequest(`Invalid value for field "${err.path}"`)
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return ApiError.conflict(`A record with this ${field} already exists`)
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
  }

  if (err.name === 'MulterError') {
    return ApiError.badRequest(`File upload error: ${err.message}`)
  }

  return ApiError.internal(err.message || MESSAGES.GENERIC.SERVER_ERROR)
}

export function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`))
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const normalized = normalizeError(err)

  if (!normalized.isOperational) {
    logger.error(`${req.method} ${req.originalUrl} — ${err.stack || err.message}`)
  } else if (normalized.statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} — ${normalized.message}`)
  } else {
    logger.warn(`${req.method} ${req.originalUrl} — ${normalized.statusCode} ${normalized.message}`)
  }

  const response = new ApiResponse(
    normalized.statusCode,
    normalized.isOperational || !env.isProd ? normalized.message : MESSAGES.GENERIC.SERVER_ERROR,
    null,
    normalized.details ? { errors: normalized.details } : null,
  )

  if (!env.isProd && !normalized.isOperational) {
    response.stack = err.stack
  }

  return response.send(res)
}
