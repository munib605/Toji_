import { parsePagination, buildPaginationMeta, parseSort } from '../utils/pagination.js'

/**
 * Thin data-access layer wrapping a Mongoose model. Services depend on this
 * abstraction rather than talking to Mongoose directly, which keeps
 * query/index concerns in one place and makes the persistence layer easy to
 * swap or mock in tests.
 */
export class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    return this.model.create(data)
  }

  async findById(id, { lean = true } = {}) {
    const query = this.model.findById(id)
    return lean ? query.lean() : query
  }

  async findOne(filter, { lean = true } = {}) {
    const query = this.model.findOne(filter)
    return lean ? query.lean() : query
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true })
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id)
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter)
  }

  /**
   * Paginated, filtered, sorted listing. `allowedSortFields` guards against
   * sorting on unindexed/unexpected fields from user input.
   */
  async paginate(filter = {}, query = {}, { allowedSortFields = [], defaultSort = { createdAt: -1 }, populate = null } = {}) {
    const { page, limit, skip } = parsePagination(query)
    const sort = parseSort(query.sort, allowedSortFields, defaultSort)

    let dbQuery = this.model.find(filter).sort(sort).skip(skip).limit(limit).lean()
    if (populate) dbQuery = dbQuery.populate(populate)

    const [items, total] = await Promise.all([dbQuery, this.model.countDocuments(filter)])

    return { items, meta: buildPaginationMeta({ page, limit, total }) }
  }
}

export default BaseRepository
