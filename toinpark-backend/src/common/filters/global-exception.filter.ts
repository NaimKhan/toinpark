import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { ValidationException } from "../exceptions/validation.exception";
import { BusinessException } from "../exceptions/business.exception";

/**
 * Global Exception Filter
 * 
 * Handles all exceptions and transforms them to common response format
 * 
 * Response Format (Consistent):
 * {
 *   "success": boolean,
 *   "statusCode": number,
 *   "message": string,
 *   "errors": null | Record<string, string[]>
 * }
 * 
 * Catches:
 * - ValidationException (422) - Field-level validation errors
 * - BusinessException (4xx) - Business logic errors
 * - HttpException (various) - Other HTTP errors
 * - Unknown errors (500) - Unhandled exceptions
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Prevent sending multiple responses
    if (response.headersSent) {
      this.logger.warn(
        "Headers already sent, skipping exception filter response.",
      );
      return;
    }

    try {
      // Handle ValidationException (422 Unprocessable Entity)
      if (exception instanceof ValidationException) {
        const errorResponse = exception.getResponse() as any;
        const status = exception.getStatus();
        response.status(status).json({
          success: false,
          statusCode: status,
          message: errorResponse.message || "Validation failed",
          errors: errorResponse.errors || null,
        });
        return;
      }

      // Handle BusinessException (4xx errors)
      if (exception instanceof BusinessException) {
        const errorResponse = exception.getResponse() as any;
        const status = exception.getStatus();
        response.status(status).json({
          success: false,
          statusCode: status,
          message: errorResponse.message || "Business logic error",
          errors: errorResponse.errors || null,
        });
        return;
      }

      // Handle HttpException (general HTTP errors)
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as any;

        const message =
          typeof exceptionResponse === "string"
            ? exceptionResponse
            : exceptionResponse?.message || "An error occurred";

        response.status(status).json({
          success: false,
          statusCode: status,
          message,
          errors: null,
        });
        return;
      }

      // Handle unknown exceptions (500 Internal Server Error)
      this.logger.error("Unhandled exception caught:", exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
        errors: null,
      });
    } catch (filterError) {
      // Log error inside filter without breaking app flow
      this.logger.error(
        "Exception filter processing failed",
        filterError as any,
      );
      // Avoid sending another response to prevent ERR_HTTP_HEADERS_SENT
    }
  }
}
