import Review from '../models/Review.model.js'
import BaseRepository from './base.repository.js'

class ReviewRepository extends BaseRepository {
  constructor() {
    super(Review)
  }

  buildFilter({ approved } = {}) {
    const filter = {}
    if (approved !== undefined) filter.isApproved = approved === 'true' || approved === true
    return filter
  }

  getAverageRating() {
    return this.model.getAverageRating()
  }
}

export const reviewRepository = new ReviewRepository()
export default reviewRepository
