import multer from 'multer'
import ApiError from '../utils/ApiError.js'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const storage = multer.memoryStorage()

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(ApiError.badRequest('Only JPEG, PNG, WEBP, and GIF images are allowed'))
  }
  cb(null, true)
}

const baseUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 6 },
})

export const uploadSingleImage = (fieldName) => baseUpload.single(fieldName)
export const uploadMultipleImages = (fieldName, maxCount = 6) => baseUpload.array(fieldName, maxCount)
export const uploadProjectImages = baseUpload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
])
