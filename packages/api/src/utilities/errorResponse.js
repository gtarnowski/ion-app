import { ERROR_MESSAGES } from '../constants/errorMessages';

export class ErrorResponse {
  constructor(errorCode) {
    this.code = errorCode;
    this.message = ERROR_MESSAGES.get(errorCode);

    if (errorCode) return this.simpleResponseError();
  }

  simpleResponseError () {
    return {
      result: {
        success: false,
        reason: {
          code: this.code,
          message: this.message,
        },
      },
    };
  }
}
