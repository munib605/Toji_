import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'
import MESSAGES from '../constants/messages.js'
import dashboardService from '../services/dashboard.service.js'

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getStats()
  return new ApiResponse(HTTP_STATUS.OK, MESSAGES.GENERIC.FETCHED('Dashboard statistics'), stats).send(res)
})
