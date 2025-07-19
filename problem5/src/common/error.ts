// Error codes for repository errors
export const customErrorCodes = {
  // General error codes
  REQUEST_FAILED: 'REQUEST_FAILED',

  // User-related error codes
  USER_CREATE_FAILED: 'USER_CREATE_FAILED',
  USER_DUPLICATE: 'USER_DUPLICATE',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
};
export const customErrorMessages = {
  // General error messages
  REQUEST_FAILED: 'Request failed with message',
  
  // User-related error messages 
  USER_CREATE_FAILED: 'Failed to create user',
  USER_DUPLICATE: 'User already exists',  
  USER_NOT_FOUND: 'User not found',
};
// Custom error class for repository errors
export class customError extends Error {
  public code: string;
  public constructor(code: string, message: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, customError.prototype);
  }
}