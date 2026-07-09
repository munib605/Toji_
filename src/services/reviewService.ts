export interface ReviewSubmission {
  name: string
  rating: number
  message: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

/**
 * Submits a client review to the backend.
 * Expects a REST endpoint at POST {API_BASE}/reviews that persists the
 * review (e.g. to MongoDB) and returns the created record.
 */
export async function submitReview(payload: ReviewSubmission): Promise<void> {
  const response = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to submit review')
  }
}
