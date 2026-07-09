import User from '../models/User.model.js'
import BaseRepository from './base.repository.js'

class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }

  findByEmail(email, { withPassword = false } = {}) {
    const query = this.model.findOne({ email: email.toLowerCase() })
    return withPassword ? query.select('+password') : query
  }
}

export const userRepository = new UserRepository()
export default userRepository
