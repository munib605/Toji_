/**
 * Base class for all operational (expected) errors thrown throughout the
 * application. Anything thrown as an ApiError is trusted to carry a safe,
 * user-facing message and a correct HTTP status code.
 */
export class ApiError extends Error {
  constructor(statusCode, message, details = null, isOperational = true) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.details = details
    this.isOperational = isOperational
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message = 'Bad request', details = null) {
    return new ApiError(400, message, details)
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message)
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message)
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message)
  }

  static conflict(message = 'Resource already exists') {
    return new ApiError(409, message)
  }

  static unprocessable(message = 'Unprocessable entity', details = null) {
    return new ApiError(422, message, details)
  }

  static tooManyRequests(message = 'Too many requests, please try again later') {
    return new ApiError(429, message)
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message, null, false)
  }
}

export default ApiError
