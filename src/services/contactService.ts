import { ContactFormData } from '@/types'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

/**
 * Sends a contact form submission to the backend, which relays it via
 * Nodemailer to the developer's email inbox. See /server/routes/contact.ts
 * for the expected Express handler.
 */
export async function sendContactMessage(payload: ContactFormData): Promise<void> {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }
}
