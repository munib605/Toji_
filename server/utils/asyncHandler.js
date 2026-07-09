/**
 * Wraps an async Express route handler so any rejected promise is forwarded
 * to `next()` and handled by the centralized error middleware, instead of
 * requiring a try/catch block in every single controller.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler
