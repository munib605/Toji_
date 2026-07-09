import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    position: { type: String, required: [true, 'Position is required'], trim: true, maxlength: 120 },
    company: { type: String, required: [true, 'Company is required'], trim: true, maxlength: 150 },
    duration: { type: String, required: [true, 'Duration is required'], trim: true, maxlength: 100 },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, trim: true, maxlength: 1000, default: '' },
    technologies: [{ type: String, trim: true }],
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

experienceSchema.index({ displayOrder: 1 })

export const Experience = mongoose.model('Experience', experienceSchema)
export default Experience
