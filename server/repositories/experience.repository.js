import Experience from '../models/Experience.model.js'
import BaseRepository from './base.repository.js'

class ExperienceRepository extends BaseRepository {
  constructor() {
    super(Experience)
  }

  findAllOrdered() {
    return this.model.find().sort({ displayOrder: 1, startDate: -1 }).lean()
  }
}

export const experienceRepository = new ExperienceRepository()
export default experienceRepository
