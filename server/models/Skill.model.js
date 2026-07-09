import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    },
    name: { type: String, required: [true, 'Skill name is required'], trim: true, maxlength: 80 },
    icon: { type: String, trim: true, default: '' },
    percentage: { type: Number, min: 0, max: 100, default: 80 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

skillSchema.index({ category: 1, displayOrder: 1 })

export const Skill = mongoose.model('Skill', skillSchema)
export default Skill
