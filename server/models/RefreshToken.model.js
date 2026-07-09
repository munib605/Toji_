import mongoose from 'mongoose'
import crypto from 'crypto'

const refreshTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    userAgent: { type: String, default: '' },
    ipAddress: { type: String, default: '' },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

// MongoDB TTL index — expired tokens are automatically purged.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

refreshTokenSchema.statics.hashToken = function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema)
export default RefreshToken
