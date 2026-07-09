import ContactMessage from '../models/ContactMessage.model.js'
import BaseRepository from './base.repository.js'

class ContactRepository extends BaseRepository {
  constructor() {
    super(ContactMessage)
  }

  buildFilter({ isRead, isReplied } = {}) {
    const filter = {}
    if (isRead !== undefined) filter.isRead = isRead === 'true' || isRead === true
    if (isReplied !== undefined) filter.isReplied = isReplied === 'true' || isReplied === true
    return filter
  }

  countUnread() {
    return this.model.countDocuments({ isRead: false })
  }
}

export const contactRepository = new ContactRepository()
export default contactRepository
