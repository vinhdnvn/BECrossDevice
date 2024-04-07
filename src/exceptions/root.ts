// for status , error
export class HttpException extends Error {
  statusCode: number;
  errorCode: any;
  message: string;
  errors: ErrorCodes;
  constructor(message: string, errorCode: ErrorCodes, statusCode: number, errors: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  Unprocessable_entity = 2001,
  INTERNAL_ERROR = 3001,
}
