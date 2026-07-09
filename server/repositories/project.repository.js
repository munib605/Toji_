import Project from '../models/Project.model.js'
import BaseRepository from './base.repository.js'

class ProjectRepository extends BaseRepository {
  constructor() {
    super(Project)
  }

  /** Builds a Mongo filter object from public query params. */
  buildFilter({ category, featured, status, search } = {}) {
    const filter = {}
    if (category) filter.category = category
    if (featured !== undefined) filter.isFeatured = featured === 'true' || featured === true
    if (status) filter.status = status
    if (search) filter.$text = { $search: search }
    return filter
  }

  findBySlug(slug) {
    return this.model.findOne({ slug }).lean()
  }
}

export const projectRepository = new ProjectRepository()
export default projectRepository
