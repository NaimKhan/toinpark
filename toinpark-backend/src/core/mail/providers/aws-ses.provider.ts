/**
 * AWS SES Mail Provider (Placeholder)
 * =====================================
 * Implementation of IMailProvider for AWS Simple Email Service.
 *
 * To use this provider:
 * 1. Install: npm install @aws-sdk/client-ses
 * 2. Set MAIL_PROVIDER=aws-ses in .env
 * 3. Configure AWS credentials (AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_SES_REGION)
 *
 * @see https://docs.aws.amazon.com/ses/latest/dg/Welcome.html
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  IMailProvider,
  IMailOptions,
  IMailResponse,
  IBulkMailOptions,
  IBulkMailResponse,
  IMailRecipient,
} from '../interfaces';

@Injectable()
export class AwsSesProvider implements IMailProvider {
  readonly name = 'aws-ses';
  private readonly logger = new Logger(AwsSesProvider.name);

  constructor() {
    // TODO: Initialize AWS SES client
    // const { SESClient } = require('@aws-sdk/client-ses');
    // this.client = new SESClient({ region: process.env.AWS_SES_REGION });

    this.logger.log('AWS SES provider initialized (placeholder)');
  }

  send(_options: IMailOptions): Promise<IMailResponse> {
    // TODO: Implement AWS SES send
    this.logger.warn('AWS SES provider not fully implemented');

    return Promise.resolve({
      success: false,
      provider: this.name,
      timestamp: new Date(),
      error:
        'AWS SES provider not yet implemented. Please use SendGrid for now.',
    });
  }

  sendBulk(options: IBulkMailOptions): Promise<IBulkMailResponse> {
    // TODO: Implement AWS SES bulk send
    this.logger.warn('AWS SES provider not fully implemented');

    return Promise.resolve({
      success: false,
      total: options.messages.length,
      sent: 0,
      failed: options.messages.length,
      results: options.messages.map(() => ({
        success: false,
        provider: this.name,
        timestamp: new Date(),
        error: 'AWS SES provider not yet implemented',
      })),
    });
  }

  sendTemplate(
    _to: string | IMailRecipient,
    _templateId: string,
    _templateData: Record<string, unknown>,
    _options?: Partial<IMailOptions>,
  ): Promise<IMailResponse> {
    // TODO: Implement AWS SES template send
    this.logger.warn('AWS SES provider not fully implemented');

    return Promise.resolve({
      success: false,
      provider: this.name,
      timestamp: new Date(),
      error: 'AWS SES provider not yet implemented',
    });
  }

  verifyConnection(): Promise<boolean> {
    // TODO: Verify AWS SES connection
    this.logger.warn('AWS SES provider not fully implemented');

    return Promise.resolve(false);
  }
}
