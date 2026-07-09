import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import contactService from '../services/contact.service.js'

export const submitContactMessage = asyncHandler(async (req, res) => {
  await contactService.submit(req.body, { ipAddress: req.ip })
  return new ApiResponse(HTTP_STATUS.CREATED, MESSAGES.CONTACT.RECEIVED).send(res)
})

export const getMessages = asyncHandler(async (req, res) => {
  const { items, meta } = await contactService.list(req.query)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Messages'), items, meta).send(res)
})

export const getMessageById = asyncHandler(async (req, res) => {
  const doc = await contactService.getById(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Message'), doc).send(res)
})

export const markMessageAsRead = asyncHandler(async (req, res) => {
  const doc = await contactService.markAsRead(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, 'Message marked as read', doc).send(res)
})

export const markMessageAsReplied = asyncHandler(async (req, res) => {
  const doc = await contactService.markAsReplied(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, 'Message marked as replied', doc).send(res)
})

export const deleteMessage = asyncHandler(async (req, res) => {
  await contactService.remove(req.params.id)
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.DELETED('Message')).send(res)
})
