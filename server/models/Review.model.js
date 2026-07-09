import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      select: false,
    },
    company: { type: String, trim: true, maxlength: 150, default: '' },
    country: { type: String, trim: true, maxlength: 100, default: '' },
    rating: { type: Number, required: [true, 'Rating is required'], min: 1, max: 5 },
    review: { type: String, required: [true, 'Review message is required'], trim: true, maxlength: 1000 },
    profileImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
)

reviewSchema.index({ isApproved: 1, createdAt: -1 })

reviewSchema.statics.getAverageRating = async function getAverageRating() {
  const result = await this.aggregate([
    { $match: { isApproved: true } },
    { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } },
  ])

  return result[0] ? { average: Math.round(result[0].average * 10) / 10, count: result[0].count } : { average: 0, count: 0 }
}

export const Review = mongoose.model('Review', reviewSchema)
export default Review
