import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { SKIP_TRANSFORM } from '../decorators/skip-transform.decorator';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    return next.handle().pipe(
      map((data) => {
        
        // Get the @ApiOperation summary from metadata
        const apiOperation = this.reflector.get('swagger/apiOperation', context.getHandler());
        
        let message = 'Success';

        // Use ApiOperation summary if available
        if (apiOperation?.summary) {
          message = apiOperation.summary;
        }

        // Return null if there's no data
        if (!data || (Array.isArray(data) && data.length === 0)) {
          data = null;
        }

        return {
          success: true,
          message,
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}