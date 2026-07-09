import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    subject: { type: String, required: [true, 'Subject is required'], trim: true, maxlength: 150 },
    message: { type: String, required: [true, 'Message is required'], trim: true, maxlength: 3000 },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
    ipAddress: { type: String, select: false },
  },
  { timestamps: true },
)

contactMessageSchema.index({ createdAt: -1 })
contactMessageSchema.index({ isRead: 1 })

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema)
export default ContactMessage
