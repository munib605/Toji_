export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Logged in successfully',
    LOGOUT_SUCCESS: 'Logged out successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_REFRESHED: 'Access token refreshed',
    UNAUTHORIZED: 'You are not authorized to access this resource',
    FORBIDDEN: 'You do not have permission to perform this action',
    TOKEN_MISSING: 'Authentication token is missing',
    TOKEN_INVALID: 'Authentication token is invalid or expired',
  },
  GENERIC: {
    CREATED: (resource) => `${resource} created successfully`,
    UPDATED: (resource) => `${resource} updated successfully`,
    DELETED: (resource) => `${resource} deleted successfully`,
    FETCHED: (resource) => `${resource} fetched successfully`,
    NOT_FOUND: (resource) => `${resource} not found`,
    SERVER_ERROR: 'Something went wrong. Please try again later.',
    VALIDATION_ERROR: 'Validation failed. Please check the submitted data.',
    ROUTE_NOT_FOUND: 'The requested route does not exist',
  },
  CONTACT: {
    RECEIVED: 'Your message has been received. I will get back to you shortly.',
  },
}

export default MESSAGES
