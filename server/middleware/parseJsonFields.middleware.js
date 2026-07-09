/**
 * When a request is sent as multipart/form-data (required for file
 * uploads), non-file fields arrive as strings — so an array field like
 * `technologies` shows up as the string '["React","Node.js"]' instead of a
 * real array. This middleware JSON-parses the given field names on `req.body`
 * before validation runs, and is a no-op for plain JSON requests where the
 * fields are already the correct type.
 */
export const parseJsonFields = (fields = []) => (req, res, next) => {
  for (const field of fields) {
    const value = req.body?.[field]
    if (typeof value === 'string') {
      try {
        req.body[field] = JSON.parse(value)
      } catch {
        // Not valid JSON — leave as-is and let schema validation reject it
        // with a clear message rather than failing silently here.
      }
    }
  }
  next()
}

export default parseJsonFields
