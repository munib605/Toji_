import projectRepository from '../repositories/project.repository.js'
import uploadService from './upload.service.js'
import createBaseService from './base.service.js'
import ApiError from '../utils/ApiError.js'

const base = createBaseService(projectRepository, 'Project')

export const projectService = {
  ...base,

  async list(query) {
    const filter = projectRepository.buildFilter(query)
    return projectRepository.paginate(filter, query, {
      allowedSortFields: ['createdAt', 'title', 'displayOrder'],
      defaultSort: { displayOrder: 1, createdAt: -1 },
    })
  },

  async getFeatured(limit = 4) {
    return projectRepository.model
      .find({ isFeatured: true, status: 'published' })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean()
  },

  async create(data, files = {}) {
    const payload = { ...data }

    if (files.thumbnail?.[0]) {
      payload.thumbnail = await uploadService.uploadImage(files.thumbnail[0], 'portfolio/projects/thumbnails')
    }

    if (files.gallery?.length) {
      payload.gallery = await uploadService.uploadImages(files.gallery, 'portfolio/projects/gallery')
    }

    return projectRepository.create(payload)
  },

  async update(id, data, files = {}) {
    const existing = await projectRepository.findById(id)
    if (!existing) throw ApiError.notFound('Project not found')

    const payload = { ...data }

    if (files.thumbnail?.[0]) {
      if (existing.thumbnail?.publicId) await uploadService.deleteImage(existing.thumbnail.publicId)
      payload.thumbnail = await uploadService.uploadImage(files.thumbnail[0], 'portfolio/projects/thumbnails')
    }

    if (files.gallery?.length) {
      payload.gallery = await uploadService.uploadImages(files.gallery, 'portfolio/projects/gallery')
    }

    return projectRepository.updateById(id, payload)
  },

  async remove(id) {
    const existing = await projectRepository.findById(id)
    if (!existing) throw ApiError.notFound('Project not found')

    const publicIds = [existing.thumbnail?.publicId, ...(existing.gallery || []).map((g) => g.publicId)].filter(Boolean)
    await uploadService.deleteImages(publicIds)

    return projectRepository.deleteById(id)
  },
}

export default projectService
