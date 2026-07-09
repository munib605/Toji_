/**
 * Every successful response in the API is shaped the same way, so clients
 * can rely on a consistent envelope regardless of the endpoint.
 */
export class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400
    this.statusCode = statusCode
    this.message = message
    if (data !== null) this.data = data
    if (meta !== null) this.meta = meta
  }

  send(res) {
    return res.status(this.statusCode).json(this)
  }
}

export default ApiResponse
