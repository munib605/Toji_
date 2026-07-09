import { emailLayout } from './layout.js'

export function passwordResetEmail({ name, resetUrl }) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;">
      We received a request to reset your password. Click the button below to choose a new one.
      This link expires in 1 hour.
    </p>
    <p style="margin:0 0 24px;">
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366F1,#8B5CF6,#06B6D4);color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;">
        Reset Password
      </a>
    </p>
    <p style="margin:0;color:#9ca3af;font-size:13px;">
      If you didn't request this, you can safely ignore this email.
    </p>
  `

  return {
    subject: 'Reset your password',
    html: emailLayout({
      title: 'Password Reset',
      preheader: 'Reset your password',
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
