import { emailLayout } from './layout.js'

export function contactConfirmationEmail({ name, subject }) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">
      Thanks for reaching out! I've received your message about
      <strong style="color:#ffffff;">"${escapeHtml(subject)}"</strong> and will get back to you within 24 hours.
    </p>
    <p style="margin:0 0 16px;">
      If your inquiry is time-sensitive, feel free to reply directly to this email.
    </p>
    <p style="margin:24px 0 0;color:#9ca3af;">— Toji</p>
  `

  return {
    subject: 'Thanks for reaching out — message received',
    html: emailLayout({
      title: 'Message Received',
      preheader: 'Your message has been received and will be answered shortly.',
      bodyHtml,
    }),
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
