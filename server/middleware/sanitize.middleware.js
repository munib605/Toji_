/**
 * Recursively strips HTML tags and script-like content from string values in
 * `req.body`, `req.query`, and `req.params`. This is a lightweight
 * replacement for the unmaintained `xss-clean` package, sufficient to
 * neutralize injected markup/script in JSON API payloads.
 */
const DANGEROUS_PATTERN = /<script.*?>.*?<\/script>|<[^>]+>/gi

function sanitizeValue(value) {
  if (typeof value === 'string') {
    return value.replace(DANGEROUS_PATTERN, '').trim()
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }

  if (value && typeof value === 'object') {
    const clean = {}
    for (const [key, val] of Object.entries(value)) {
      clean[key] = sanitizeValue(val)
    }
    return clean
  }

  return value
}

export function sanitizeInput(req, res, next) {
  if (req.body && typeof req.body === 'object') req.body = sanitizeValue(req.body)
  if (req.query && typeof req.query === 'object') {
    for (const key of Object.keys(req.query)) {
      req.query[key] = sanitizeValue(req.query[key])
    }
  }
  if (req.params && typeof req.params === 'object') {
    for (const key of Object.keys(req.params)) {
      req.params[key] = sanitizeValue(req.params[key])
    }
  }
  next()
}

export default sanitizeInput
