// Local-only entry point for running the API with `npm run dev:server`.
// Vercel does NOT use this file — in production, api/index.js handles
// each request as a serverless function instead. This just makes local
// full-stack development possible without needing two separate repos.
import app from './server/app.js'
import env from './server/config/env.js'
import logger from './server/config/logger.js'
import { connectDB, disconnectDB } from './server/config/db.js'

let server

async function start() {
  await connectDB()

  server = app.listen(env.port, () => {
    logger.info(`🚀 Local API running in ${env.nodeEnv} mode on port ${env.port}`)
    logger.info(`   Health check: http://localhost:${env.port}${env.apiPrefix}/health`)
  })
}

async function shutdown(signal) {
  logger.info(`${signal} received. Shutting down gracefully...`)
  if (server) {
    server.close(async () => {
      await disconnectDB()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10000).unref()
  } else {
    process.exit(0)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

start().catch((error) => {
  logger.error(`Failed to start local server: ${error.stack || error.message}`)
  process.exit(1)
})
