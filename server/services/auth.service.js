import userRepository from '../repositories/user.repository.js'
import RefreshToken from '../models/RefreshToken.model.js'
import { generateAuthTokens, verifyRefreshToken, signAccessToken } from '../utils/tokens.js'
import ApiError from '../utils/ApiError.js'
import MESSAGES from '../constants/messages.js'
import env from '../config/env.js'

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000

async function persistRefreshToken(userId, token, meta = {}) {
  const tokenHash = RefreshToken.hashToken(token)
  await RefreshToken.create({
    user: userId,
    tokenHash,
    userAgent: meta.userAgent || '',
    ipAddress: meta.ipAddress || '',
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  })
}

export const authService = {
  async login({ email, password }, meta = {}) {
    const user = await userRepository.findByEmail(email, { withPassword: true })

    if (!user || !user.isActive) {
      throw ApiError.unauthorized(MESSAGES.AUTH.INVALID_CREDENTIALS)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw ApiError.unauthorized(MESSAGES.AUTH.INVALID_CREDENTIALS)
    }

    const tokens = generateAuthTokens(user)
    await persistRefreshToken(user._id, tokens.refreshToken, meta)

    user.lastLoginAt = new Date()
    await user.save({ validateBeforeSave: false })

    return { user: user.toJSON(), ...tokens }
  },

  async refresh(refreshToken, meta = {}) {
    if (!refreshToken) throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_MISSING)

    let payload
    try {
      payload = verifyRefreshToken(refreshToken)
    } catch {
      throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
    }

    const tokenHash = RefreshToken.hashToken(refreshToken)
    const stored = await RefreshToken.findOne({ tokenHash, user: payload.sub })

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
    }

    const user = await userRepository.findById(payload.sub, { lean: true })
    if (!user || !user.isActive) {
      throw ApiError.unauthorized(MESSAGES.AUTH.TOKEN_INVALID)
    }

    // Rotate: revoke the used refresh token and issue a new pair.
    stored.revokedAt = new Date()
    await stored.save()

    const tokens = generateAuthTokens(user)
    await persistRefreshToken(user._id, tokens.refreshToken, meta)

    return tokens
  },

  async logout(refreshToken) {
    if (!refreshToken) return
    const tokenHash = RefreshToken.hashToken(refreshToken)
    await RefreshToken.updateOne({ tokenHash }, { revokedAt: new Date() })
  },

  /** Convenience for other services that just need a fresh access token. */
  reissueAccessToken(user) {
    return signAccessToken({ sub: user._id.toString(), role: user.role })
  },

  cookieDomain: env.cookieDomain,
}

export default authService
