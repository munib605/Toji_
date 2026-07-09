import { verifyAccessToken } from '../utils/tokens.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/User.model.js'
import MESSAGES from '../constants/messages.js'

/**
 * Requires a valid Bearer access token. Populates `req.user` with the
 * authenticated user's id and role (a lean lookup, not a full document,
 * for speed — controllers that need the full user should fetch it).
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_MISSING)
  }

  const token = header.split(' ')[1]

  let payload
  try {
    payload = verifyAccessToken(token)
  } catch {
    throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
  }

  const user = await User.findById(payload.sub).select('_id role isActive').lean()

  if (!user || !user.isActive) {
    throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
  }

  req.user = { id: user._id.toString(), role: user.role }
  next()
})

/**
 * Attaches `req.user` if a valid token is present, but never rejects the
 * request — useful for endpoints whose behavior only slightly changes for
 * authenticated callers.
 */
export const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return next()

  try {
    const payload = verifyAccessToken(header.split(' ')[1])
    const user = await User.findById(payload.sub).select('_id role isActive').lean()
    if (user?.isActive) {
      req.user = { id: user._id.toString(), role: user.role }
    }
  } catch {
    // Silently ignore invalid/expired tokens for optional auth
  }

  next()
})

export default authenticate
