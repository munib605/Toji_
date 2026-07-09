import mongoose from 'mongoose'
import env from './env.js'
import logger from './logger.js'
import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

mongoose.set('strictQuery', true)

// Serverless functions can be invoked many times per second, each in its
// own execution context, but the *module scope* (and this cached promise)
// is reused across invocations on a warm container. Without this cache,
// every request would open a brand new MongoDB connection and quickly
// exhaust Atlas's connection limit.
let cachedConnection = global.__mongooseConnection

if (!cachedConnection) {
  cachedConnection = global.__mongooseConnection = { conn: null, promise: null }
}

export async function connectDB() {
  if (cachedConnection.conn) {
    return cachedConnection.conn
  }

  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(env.mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        logger.info(`✅ MongoDB connected: ${mongooseInstance.connection.host}`)
        return mongooseInstance
      })
      .catch((error) => {
        cachedConnection.promise = null
        logger.error(`MongoDB connection failed: ${error.message}`)
        throw error
      })
  }

  cachedConnection.conn = await cachedConnection.promise
  return cachedConnection.conn
}

export async function disconnectDB() {
  if (cachedConnection.conn) {
    await mongoose.connection.close()
    cachedConnection.conn = null
    cachedConnection.promise = null
    logger.info('MongoDB connection closed')
  }
}

mongoose.connection.on('error', (err) => logger.error(`MongoDB runtime error: ${err.message}`))
mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))
