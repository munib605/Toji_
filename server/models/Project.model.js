import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false },
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Project title is required'], trim: true, maxlength: 150 },
    slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: 2000 },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true, default: '' },
    liveUrl: { type: String, trim: true, default: '' },
    thumbnail: { type: imageSchema, default: null },
    gallery: [imageSchema],
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'mobile', 'ai', 'other'],
      default: 'fullstack',
    },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

projectSchema.pre('validate', function generateSlug(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

projectSchema.index({ title: 'text', description: 'text', technologies: 'text' })
projectSchema.index({ isFeatured: 1, status: 1, displayOrder: 1 })

export const Project = mongoose.model('Project', projectSchema)
export default Project
