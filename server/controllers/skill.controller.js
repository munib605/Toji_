import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import skillService from '../services/skill.service.js'
import createBaseController from './base.controller.js'

const base = createBaseController(skillService, 'Skill')

export const getSkills = asyncHandler(async (req, res) => {
  const items = await skillService.list()
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Skills'), items).send(res)
})

export const { create: createSkill, update: updateSkill, remove: deleteSkill } = base
