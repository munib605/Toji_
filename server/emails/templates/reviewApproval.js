import { emailLayout } from './layout.js'

export function reviewApprovalEmail({ name }) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">
      Thank you for your review — it's now live on the portfolio. I really appreciate you taking the time to share your feedback!
    </p>
    <p style="margin:24px 0 0;color:#9ca3af;">— Alex</p>
  `

  return {
    subject: 'Your review has been published',
    html: emailLayout({
      title: 'Review Approved',
      preheader: 'Your review is now live.',
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
