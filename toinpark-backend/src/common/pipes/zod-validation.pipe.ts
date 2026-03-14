import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { ValidationException } from '../exceptions';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        
        // Format errors to match class-validator format
        const formattedErrors: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          // Get the property path (e.g., "email" or "address.street")
          const propertyPath = issue.path.join('.');
          
          if (!formattedErrors[propertyPath]) {
            formattedErrors[propertyPath] = [];
          }
          
          formattedErrors[propertyPath].push(issue.message);
        });

        throw new ValidationException(formattedErrors);
      }

      // fallback for unexpected validation issues
      throw new BadRequestException({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: []
      });
    }
  }
}
