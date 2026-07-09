import ApiError from '../utils/ApiError.js'
import MESSAGES from '../constants/messages.js'

/**
 * Restricts a route to one or more roles. Must run after `authenticate`.
 * Usage: router.post('/', authenticate, authorize('admin'), handler)
 */
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unauthorized(MESSAGES.AUTH.UNAUTHORIZED))
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(ApiError.forbidden(MESSAGES.AUTH.FORBIDDEN))
  }

  next()
}

export default authorize
