import app from '../server/app.js'
import { connectDB } from '../server/config/db.js'
import logger from '../server/config/logger.js'

// Vercel keeps warm containers around between requests and reuses this
// module's top-level scope, so the cached connection from connectDB()
// is genuinely reused most of the time — we just make sure it's ready
// before letting a request reach the Express app.
export default async function handler(req, res) {
  try {
    await connectDB()
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error.message}`)
    res.statusCode = 503
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'Database unavailable' }))
    return
  }

  return app(req, res)
}
