import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {

  private readonly logger = new Logger(CustomThrottlerGuard.name);
  
  protected async throwThrottlingException(context: ExecutionContext): Promise<void> {
    this.logger.warn('Throttling limit exceeded for request.', {
      context,
    });
    
    throw new ThrottlerException('Too many requests. Please try again later.');
  }
}