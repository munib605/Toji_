import ApiError from '../utils/ApiError.js'

/**
 * Produces a small set of shared CRUD operations bound to a repository.
 * Resource-specific services compose this rather than re-implementing
 * identical create/read/update/delete logic.
 */
export function createBaseService(repository, resourceName) {
  return {
    async getById(id) {
      const doc = await repository.findById(id)
      if (!doc) throw ApiError.notFound(`${resourceName} not found`)
      return doc
    },

    async create(data) {
      return repository.create(data)
    },

    async update(id, data) {
      const updated = await repository.updateById(id, data)
      if (!updated) throw ApiError.notFound(`${resourceName} not found`)
      return updated
    },

    async remove(id) {
      const deleted = await repository.deleteById(id)
      if (!deleted) throw ApiError.notFound(`${resourceName} not found`)
      return deleted
    },
  }
}

export default createBaseService
