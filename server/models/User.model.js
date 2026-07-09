import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { ROLE_VALUES, ROLES } from '../constants/roles.js'

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Full name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: { type: String, required: [true, 'Password is required'], minlength: 8, select: false },
    profileImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    role: { type: String, enum: ROLE_VALUES, default: ROLES.ADMIN },
    bio: { type: String, maxlength: 500, default: '' },
    skills: [{ type: String, trim: true }],
    socialLinks: [socialLinkSchema],
    resumeUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password)
}

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject()
  delete obj.password
  delete obj.__v
  return obj
}

export const User = mongoose.model('User', userSchema)
export default User
