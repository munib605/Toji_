import { Router } from 'express'
import mongoose from 'mongoose'
import ApiResponse from '../utils/ApiResponse.js'
import HTTP_STATUS from '../constants/httpStatus.js'

const router = Router()

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState // 1 = connected
  const isHealthy = dbState === 1

  return new ApiResponse(
    isHealthy ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE,
    isHealthy ? 'Service is healthy' : 'Service is degraded',
    {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: isHealthy ? 'connected' : 'disconnected',
    },
  ).send(res)
})

export default router
