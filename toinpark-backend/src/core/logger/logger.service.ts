import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly configService: ConfigService) {}

  log(message: string, context?: string) {
    this.printMessage('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.printMessage('ERROR', message, context);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    this.printMessage('WARN', message, context);
  }

  debug(message: string, context?: string) {
    if (this.configService.isDevelopment) {
      this.printMessage('DEBUG', message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (this.configService.isDevelopment) {
      this.printMessage('VERBOSE', message, context);
    }
  }

  private printMessage(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const emoji = this.getEmoji(level);

    console.log(`${emoji} ${timestamp} [${level}] ${contextStr} ${message}`);
  }

  private getEmoji(level: string): string {
    const emojis: Record<string, string> = {
      LOG: '📝',
      ERROR: '❌',
      WARN: '⚠️',
      DEBUG: '🐛',
      VERBOSE: '💬',
    };
    return emojis[level] || '📝';
  }
}