import { ZodError } from 'zod'
import ApiError from '../utils/ApiError.js'

/**
 * Validates `req.body`, `req.params`, and `req.query` against a Zod schema
 * shaped as `{ body?, params?, query? }`. On success, the parsed (and
 * coerced/defaulted) values are written back onto `req` so controllers can
 * trust their shape.
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    })

    if (parsed.body) req.body = parsed.body
    if (parsed.params) req.params = parsed.params
    if (parsed.query) req.query = parsed.query

    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map((e) => ({
        field: e.path.slice(1).join('.'),
        message: e.message,
      }))
      return next(ApiError.unprocessable('Validation failed', details))
    }
    next(error)
  }
}

export default validate
