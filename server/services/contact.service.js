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
   * sends both notification emails. These are awaited (not fire-and-forget)
   * because on serverless platforms like Vercel the function's execution
   * context is frozen as soon as a response is sent — any un-awaited
   * promise still in flight (like an SMTP handshake) gets killed before it
   * completes. Failures here are still caught so a mail hiccup never fails
   * the request.
   */
  async submit({ name, email, subject, message }, meta = {}) {
    const saved = await contactRepository.create({
      name,
      email,
      subject,
      message,
      ipAddress: meta.ipAddress,
    })

    const results = await Promise.allSettled([
      emailService.sendContactConfirmation({ name, email, subject }),
      emailService.sendAdminNotification({ name, email, subject, message }),
    ])

    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        logger.warn(`Contact email ${i === 0 ? 'confirmation' : 'notification'} failed: ${r.reason?.message}`)
      }
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