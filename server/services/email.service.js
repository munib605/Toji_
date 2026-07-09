import nodemailer from 'nodemailer'
import env from '../config/env.js'
import logger from '../config/logger.js'
import { contactConfirmationEmail } from '../emails/templates/contactConfirmation.js'
import { adminNotificationEmail } from '../emails/templates/adminNotification.js'
import { reviewApprovalEmail } from '../emails/templates/reviewApproval.js'
import { passwordResetEmail } from '../emails/templates/passwordReset.js'

let transporter = null

function getTransporter() {
  if (transporter) return transporter

  if (!env.smtp.host || !env.smtp.user) {
    logger.warn('SMTP is not configured — emails will be logged instead of sent.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.password },
  })

  return transporter
}

/**
 * Sends an email, or — when SMTP isn't configured (e.g. local dev without
 * credentials) — logs it instead so the rest of the flow (saving to DB,
 * responding to the client) still completes without throwing.
 */
async function dispatch({ to, subject, html }) {
  const client = getTransporter()

  if (!client) {
    logger.info(`[email:skipped — no SMTP configured] To: ${to} | Subject: ${subject}`)
    return { skipped: true }
  }

  try {
    const info = await client.sendMail({ from: env.smtp.from, to, subject, html })
    logger.info(`Email sent to ${to}: ${info.messageId}`)
    return { skipped: false, messageId: info.messageId }
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error.message}`)
    throw error
  }
}

export const emailService = {
  async sendContactConfirmation({ name, email, subject }) {
    const { subject: emailSubject, html } = contactConfirmationEmail({ name, subject })
    return dispatch({ to: email, subject: emailSubject, html })
  },

  async sendAdminNotification({ name, email, subject, message }) {
    if (!env.smtp.ownerEmail) return { skipped: true }
    const { subject: emailSubject, html } = adminNotificationEmail({ name, email, subject, message })
    return dispatch({ to: env.smtp.ownerEmail, subject: emailSubject, html })
  },

  async sendReviewApproval({ name, email }) {
    if (!email) return { skipped: true }
    const { subject, html } = reviewApprovalEmail({ name })
    return dispatch({ to: email, subject, html })
  },

  async sendPasswordReset({ name, email, resetUrl }) {
    const { subject, html } = passwordResetEmail({ name, resetUrl })
    return dispatch({ to: email, subject, html })
  },
}

export default emailService
