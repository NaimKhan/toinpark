/**
 * Mail Module
 * ============
 * Dynamic module that provides email functionality with swappable providers.
 *
 * The provider is selected based on the MAIL_PROVIDER environment variable:
 * - 'sendgrid' (default) - Uses SendGrid
 * - 'mailtrap' - Uses Mailtrap (for testing)
 * - 'aws-ses' - Uses AWS SES
 *
 * @example
 * // Set in .env file:
 * MAIL_PROVIDER=mailtrap  # or 'sendgrid'
 *
 * // In any service:
 * await this.mailService.sendOtpEmail(email, otp, 'Verify Email', 'verification', 5);
 */

import { Module, Global, Logger } from '@nestjs/common';
import { MAIL_PROVIDER } from './interfaces';
import { MailService } from './mail.service';
import { SendGridProvider, AwsSesProvider, MailtrapProvider } from './providers';

/**
 * Factory to create the appropriate mail provider based on MAIL_PROVIDER env
 */
const mailProviderFactory = {
  provide: MAIL_PROVIDER,
  useFactory: () => {
    const logger = new Logger('MailModule');
    const providerType = (process.env.MAIL_PROVIDER || 'sendgrid').toLowerCase();

    logger.log(`Initializing mail provider: ${providerType}`);

    switch (providerType) {
      case 'sendgrid':
        return new SendGridProvider();

      case 'mailtrap':
        return new MailtrapProvider();

      case 'aws-ses':
      case 'ses':
        return new AwsSesProvider();

      default:
        logger.warn(`Unknown provider: ${providerType}, falling back to SendGrid`);
        return new SendGridProvider();
    }
  },
};

@Global()
@Module({
  providers: [mailProviderFactory, MailService],
  exports: [MailService],
})
export class MailModule {}
