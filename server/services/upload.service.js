import cloudinary from '../config/cloudinary.js'
import ApiError from '../utils/ApiError.js'
import logger from '../config/logger.js'

/**
 * Streams an in-memory file buffer (from Multer's memoryStorage) up to
 * Cloudinary, avoiding any temp file writes to disk.
 */
function streamUpload(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )
    stream.end(buffer)
  })
}

export const uploadService = {
  async uploadImage(file, folder = 'portfolio/misc') {
    if (!file) throw ApiError.badRequest('No file provided')

    try {
      const result = await streamUpload(file.buffer, folder)
      return { url: result.secure_url, publicId: result.public_id }
    } catch (error) {
      logger.error(`Cloudinary upload failed: ${error.message}`)
      throw ApiError.internal('Image upload failed')
    }
  },

  async uploadImages(files = [], folder = 'portfolio/misc') {
    return Promise.all(files.map((file) => this.uploadImage(file, folder)))
  },

  async deleteImage(publicId) {
    if (!publicId) return
    try {
      await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      // Non-fatal: log and continue, an orphaned Cloudinary asset isn't
      // worth failing the parent request over.
      logger.warn(`Failed to delete Cloudinary asset ${publicId}: ${error.message}`)
    }
  },

  async deleteImages(publicIds = []) {
    await Promise.all(publicIds.filter(Boolean).map((id) => this.deleteImage(id)))
  },
}

export default uploadService
