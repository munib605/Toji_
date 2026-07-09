import skillRepository from '../repositories/skill.repository.js'
import createBaseService from './base.service.js'

export const skillService = {
  ...createBaseService(skillRepository, 'Skill'),

  async list() {
    return skillRepository.findAllGrouped()
  },
}

export default skillService
