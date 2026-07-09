import rateLimit from 'express-rate-limit'
import env from '../config/env.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'

function handler(req, res) {
  new ApiResponse(HTTP_STATUS.TOO_MANY_REQUESTS, 'Too many requests, please try again later').send(res)
}

/** General API rate limiter — applied globally. */
export const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})

/** Stricter limiter for the public contact form, to deter spam. */
export const contactLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.contactMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})

/** Stricter limiter for login attempts, to slow brute-force attacks. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
})
