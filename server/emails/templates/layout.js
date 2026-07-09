/**
 * Wraps templated content in a consistent, dark-gradient branded HTML shell
 * matching the portfolio's visual identity.
 */
export function emailLayout({ preheader = '', title = '', bodyHtml = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <span style="display:none;font-size:1px;color:#050816;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050816;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#0B1120;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,#6366F1,#8B5CF6,#06B6D4);">
              <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">Toji</span>
              <span style="color:rgba(255,255,255,0.8);font-size:14px;"> — MERN Stack Developer</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#e5e7eb;font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);color:#6b7280;font-size:12px;">
              © ${new Date().getFullYear()} Toji. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
