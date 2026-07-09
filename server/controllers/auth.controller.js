import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import authService from '../services/auth.service.js'
import userRepository from '../repositories/user.repository.js'
import env from '../config/env.js'
import { REFRESH_COOKIE_NAME, refreshCookieOptions } from '../utils/tokens.js'

function requestMeta(req) {
  return { userAgent: req.headers['user-agent'] || '', ipAddress: req.ip }
}

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body, requestMeta(req))

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions(env))

  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.AUTH.LOGIN_SUCCESS, { user, accessToken }).send(res)
})

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE_NAME]
  const tokens = await authService.refresh(token, requestMeta(req))

  res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, refreshCookieOptions(env))

  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.AUTH.TOKEN_REFRESHED, { accessToken: tokens.accessToken }).send(res)
})

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE_NAME]
  await authService.logout(token)

  res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/auth' })

  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.AUTH.LOGOUT_SUCCESS).send(res)
})

export const getProfile = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.user.id)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Profile'), user).send(res)
})
