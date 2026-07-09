/**
 * Parses pagination/sorting query params into safe, bounded values and
 * returns a `meta` object shaped for API responses.
 */
export function parsePagination(query, defaults = {}) {
  const page = Math.max(parseInt(query.page, 10) || defaults.page || 1, 1)
  const limitRaw = parseInt(query.limit, 10) || defaults.limit || 10
  const limit = Math.min(Math.max(limitRaw, 1), defaults.maxLimit || 100)
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function buildPaginationMeta({ page, limit, total }) {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(Math.ceil(total / limit), 1),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  }
}

export function parseSort(sortQuery, allowedFields = [], defaultSort = { createdAt: -1 }) {
  if (!sortQuery) return defaultSort

  const sort = {}
  const fields = String(sortQuery).split(',')

  for (const field of fields) {
    const direction = field.startsWith('-') ? -1 : 1
    const key = field.replace(/^-/, '')
    if (allowedFields.length === 0 || allowedFields.includes(key)) {
      sort[key] = direction
    }
  }

  return Object.keys(sort).length > 0 ? sort : defaultSort
}
