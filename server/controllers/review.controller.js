import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import reviewService from '../services/review.service.js'

export const getReviews = asyncHandler(async (req, res) => {
  const { items, meta } = await reviewService.list(req.query)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Reviews'), items, meta).send(res)
})

export const getApprovedReviews = asyncHandler(async (req, res) => {
  const { items, meta } = await reviewService.listApproved(req.query)
  const stats = await reviewService.getStats()
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Reviews'), items, { ...meta, ...stats }).send(res)
})

export const submitReview = asyncHandler(async (req, res) => {
  const doc = await reviewService.submit(req.body, req.file)
  return new ApiResponse(
    HTTP_STATUS.CREATED,
    'Thanks for your review! It will appear once approved.',
    doc,
  ).send(res)
})

export const approveReview = asyncHandler(async (req, res) => {
  const doc = await reviewService.approve(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, 'Review approved', doc).send(res)
})

export const updateReview = asyncHandler(async (req, res) => {
  const doc = await reviewService.update(req.params.id, req.body)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.UPDATED('Review'), doc).send(res)
})

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.remove(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.DELETED('Review')).send(res)
})
