import About from '../models/About.model.js'

class AboutRepository {
  async get() {
    return About.findOne({ singleton: 'about' }).lean()
  }

  async upsert(data) {
    return About.findOneAndUpdate(
      { singleton: 'about' },
      { $set: data, $setOnInsert: { singleton: 'about' } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    )
  }
}

export const aboutRepository = new AboutRepository()
export default aboutRepository
