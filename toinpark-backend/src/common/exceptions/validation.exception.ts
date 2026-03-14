import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for validation errors.
 */
export class ValidationException extends HttpException {
  constructor(validationErrors: object) {
    super(
      {
        success: false,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable Entity',
        errors: validationErrors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
export class ValidationExceptionV1 extends HttpException {
  constructor(validationErrors: object) {
    super(
      {
        success: false,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unprocessable Entity',
        response : null,
        errors: validationErrors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}