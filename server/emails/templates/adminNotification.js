import { emailLayout } from './layout.js'

export function adminNotificationEmail({ name, email, subject, message }) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">New contact form submission:</p>
    <table role="presentation" width="100%" style="margin-bottom:16px;">
      <tr><td style="color:#9ca3af;padding:4px 0;width:90px;">Name</td><td style="color:#ffffff;">${escapeHtml(name)}</td></tr>
      <tr><td style="color:#9ca3af;padding:4px 0;">Email</td><td style="color:#ffffff;">${escapeHtml(email)}</td></tr>
      <tr><td style="color:#9ca3af;padding:4px 0;">Subject</td><td style="color:#ffffff;">${escapeHtml(subject)}</td></tr>
    </table>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;color:#d1d5db;white-space:pre-wrap;">${escapeHtml(message)}</div>
  `

  return {
    subject: `New inquiry: ${subject}`,
    html: emailLayout({
      title: 'New Contact Message',
      preheader: `New message from ${name}`,
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
