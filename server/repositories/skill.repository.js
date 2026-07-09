import Skill from '../models/Skill.model.js'
import BaseRepository from './base.repository.js'

class SkillRepository extends BaseRepository {
  constructor() {
    super(Skill)
  }

  findAllGrouped() {
    return this.model.find().sort({ category: 1, displayOrder: 1 }).lean()
  }
}

export const skillRepository = new SkillRepository()
export default skillRepository
