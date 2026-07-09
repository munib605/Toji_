import aboutRepository from '../repositories/about.repository.js'

export const aboutService = {
  async get() {
    return aboutRepository.get()
  },

  async update(data) {
    return aboutRepository.upsert(data)
  },
}

export default aboutService
