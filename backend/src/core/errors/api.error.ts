export class ApiError extends Error {
  statusCode: number;
  code?: string;

  constructor(statusCode = 500, message = "Internal Server Error", code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
