import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import projectService from '../services/project.service.js'
import createBaseController from './base.controller.js'

const base = createBaseController(projectService, 'Project')

export const getProjects = asyncHandler(async (req, res) => {
  const { items, meta } = await projectService.list(req.query)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Projects'), items, meta).send(res)
})

export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 4
  const items = await projectService.getFeatured(limit)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Featured projects'), items).send(res)
})

export const getProjectById = base.getById

export const createProject = asyncHandler(async (req, res) => {
  const doc = await projectService.create(req.body, req.files || {})
  return new ApiResponse(HTTP_STATUS.CREATED, MESSAGES.GENERIC.CREATED('Project'), doc).send(res)
})

export const updateProject = asyncHandler(async (req, res) => {
  const doc = await projectService.update(req.params.id, req.body, req.files || {})
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.UPDATED('Project'), doc).send(res)
})

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.remove(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.DELETED('Project')).send(res)
})
