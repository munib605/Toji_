import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import experienceService from '../services/experience.service.js'
import createBaseController from './base.controller.js'

const base = createBaseController(experienceService, 'Experience')

export const getExperience = asyncHandler(async (req, res) => {
  const items = await experienceService.list()
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Experience'), items).send(res)
})

export const { create: createExperience, update: updateExperience, remove: deleteExperience } = base
