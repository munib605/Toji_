import experienceRepository from '../repositories/experience.repository.js'
import createBaseService from './base.service.js'

export const experienceService = {
  ...createBaseService(experienceRepository, 'Experience'),

  async list() {
    return experienceRepository.findAllOrdered()
  },
}

export default experienceService
