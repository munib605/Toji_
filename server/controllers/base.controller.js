import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'

/**
 * Generates standard `create` / `update` / `remove` / `getById` handlers
 * bound to a service, so resource controllers only need to define the
 * behavior that's actually specific to them (listing, filters, uploads).
 */
export function createBaseController(service, resourceName) {
  return {
    getById: asyncHandler(async (req, res) => {
      const doc = await service.getById(req.params.id)
      return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED(resourceName), doc).send(res)
    }),

    create: asyncHandler(async (req, res) => {
      const doc = await service.create(req.body)
      return new ApiResponse(HTTP_STATUS.CREATED, MESSAGES.GENERIC.CREATED(resourceName), doc).send(res)
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await service.update(req.params.id, req.body)
      return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.UPDATED(resourceName), doc).send(res)
    }),

    remove: asyncHandler(async (req, res) => {
      await service.remove(req.params.id)
      return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.DELETED(resourceName)).send(res)
    }),
  }
}

export default createBaseController
