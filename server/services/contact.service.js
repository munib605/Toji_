import contactRepository from '../repositories/contact.repository.js'
import emailService from './email.service.js'
import createBaseService from './base.service.js'
import logger from '../config/logger.js'

const base = createBaseService(contactRepository, 'Message')

export const contactService = {
  ...base,

  async list(query) {
    const filter = contactRepository.buildFilter(query)
    return contactRepository.paginate(filter, query, {
      allowedSortFields: ['createdAt'],
      defaultSort: { createdAt: -1 },
    })
  },

  /**
   * Persists the message first (the durable, user-facing outcome), then
   * fires both notification emails without blocking or failing the request
   * if the mail provider has a hiccup.
   */
  async submit({ name, email, subject, message }, meta = {}) {
    const saved = await contactRepository.create({
      name,
      email,
      subject,
      message,
      ipAddress: meta.ipAddress,
    })

    Promise.allSettled([
      emailService.sendContactConfirmation({ name, email, subject }),
      emailService.sendAdminNotification({ name, email, subject, message }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          logger.warn(`Contact email ${i === 0 ? 'confirmation' : 'notification'} failed: ${r.reason?.message}`)
        }
      })
    })

    return saved
  },

  async markAsRead(id) {
    return contactRepository.updateById(id, { isRead: true })
  },

  async markAsReplied(id) {
    return contactRepository.updateById(id, { isReplied: true })
  },

  async countUnread() {
    return contactRepository.countUnread()
  },
}

export default contactService
