import { HttpException, HttpStatus } from '@nestjs/common';

export class UnverifiedAccountException extends HttpException {
  constructor(
    public readonly otpUniqueKey: string,
    public readonly identifierType: string,
    public readonly identifier: string,
  ) {
    super(
      {
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Your account is not verified. Please verify your account to continue.',
        data: {
          isVerified: false,
          otpUniqueKey,
          identifierType,
          identifier,
        },
        timestamp: new Date().toISOString(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}