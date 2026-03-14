import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(`Prisma Error: ${exception.code}`, exception.message);

    switch (exception.code) {
      case 'P2002': {
        // Unique constraint violation
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint violation. Record already exists.',
          error: 'Conflict',
        });
        break;
      }
      case 'P2025': {
        // Record not found
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: 'Record not found',
          error: 'Not Found',
        });
        break;
      }
      case 'P2003': {
        // Foreign key constraint failed
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          message: 'Foreign key constraint failed',
          error: 'Bad Request',
        });
        break;
      }
      default:
        // Default to 500 for unknown Prisma errors
        super.catch(exception, host);
        break;
    }
  }
}