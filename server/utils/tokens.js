import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export function signAccessToken(payload) {
  return jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn })
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret)
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret)
}

/**
 * Generates a matched access/refresh token pair for a user document.
 */
export function generateAuthTokens(user) {
  const payload = { sub: user._id.toString(), role: user.role }
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  }
}

const REFRESH_COOKIE_NAME = 'refreshToken'

export function refreshCookieOptions(env_) {
  const maxAgeMs = 30 * 24 * 60 * 60 * 1000 // 30 days, matches default refresh expiry
  return {
    httpOnly: true,
    secure: env_.isProd,
    sameSite: env_.isProd ? 'none' : 'lax',
    domain: env_.isProd ? env_.cookieDomain : undefined,
    maxAge: maxAgeMs,
    path: '/api/auth',
  }
}

export { REFRESH_COOKIE_NAME }
