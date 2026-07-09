import reviewRepository from '../repositories/review.repository.js'
import uploadService from './upload.service.js'
import emailService from './email.service.js'
import createBaseService from './base.service.js'
import ApiError from '../utils/ApiError.js'
import logger from '../config/logger.js'

const base = createBaseService(reviewRepository, 'Review')

export const reviewService = {
  ...base,

  async list(query) {
    const filter = reviewRepository.buildFilter(query)
    return reviewRepository.paginate(filter, query, {
      allowedSortFields: ['createdAt', 'rating'],
      defaultSort: { createdAt: -1 },
    })
  },

  async listApproved(query) {
    return this.list({ ...query, approved: 'true' })
  },

  async getStats() {
    return reviewRepository.getAverageRating()
  },

  /** Public submission — always created unapproved, pending admin review. */
  async submit(data, file) {
    const payload = { ...data, isApproved: false }

    if (file) {
      payload.profileImage = await uploadService.uploadImage(file, 'portfolio/reviews')
    }

    return reviewRepository.create(payload)
  },

  async approve(id) {
    const review = await reviewRepository.model.findById(id).select('+email')
    if (!review) throw ApiError.notFound('Review not found')

    review.isApproved = true
    await review.save()

    emailService.sendReviewApproval({ name: review.name, email: review.email }).catch((err) => {
      logger.warn(`Review approval email failed: ${err.message}`)
    })

    return review
  },

  async remove(id) {
    const existing = await reviewRepository.findById(id)
    if (!existing) throw ApiError.notFound('Review not found')

    if (existing.profileImage?.publicId) {
      await uploadService.deleteImage(existing.profileImage.publicId)
    }

    return reviewRepository.deleteById(id)
  },
}

export default reviewService
