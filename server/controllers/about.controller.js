import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import aboutService from '../services/about.service.js'

export const getAbout = asyncHandler(async (req, res) => {
  const doc = await aboutService.get()
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('About'), doc).send(res)
})

export const updateAbout = asyncHandler(async (req, res) => {
  const doc = await aboutService.update(req.body)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.UPDATED('About'), doc).send(res)
})
