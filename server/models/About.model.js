import mongoose from 'mongoose'

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Alex Rivera' },
    shortBio: { type: String, trim: true, maxlength: 300, default: '' },
    longBio: { type: String, trim: true, maxlength: 3000, default: '' },
    resumeUrl: { type: String, trim: true, default: '' },
    yearsOfExperience: { type: Number, min: 0, default: 1 },
    location: { type: String, trim: true, default: '' },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    socialLinks: [socialLinkSchema],
    // Enforces a single document via a fixed, well-known key.
    singleton: { type: String, default: 'about', unique: true, immutable: true },
  },
  { timestamps: true },
)

export const About = mongoose.model('About', aboutSchema)
export default About
