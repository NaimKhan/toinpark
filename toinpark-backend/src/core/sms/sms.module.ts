import { Module, Global, Logger } from '@nestjs/common';
import { SMS_PROVIDER } from './interfaces/sms-provider.interface';
import { SmsService } from './sms.service';
import { TwilioProvider } from './providers/twilio.provider';

/**
 * Factory to create the appropriate SMS provider based on SMS_PROVIDER env
 */
const smsProviderFactory = {
  provide: SMS_PROVIDER,
  useFactory: () => {
    const logger = new Logger('SmsModule');
    const providerType = (process.env.SMS_PROVIDER || 'twilio').toLowerCase();

    logger.log(`Initializing SMS provider: ${providerType}`);

    switch (providerType) {
      case 'twilio':
        return new TwilioProvider();

      default:
        logger.warn(`Unknown provider: ${providerType}, falling back to Twilio`);
        return new TwilioProvider();
    }
  },
};

@Global()
@Module({
  providers: [smsProviderFactory, SmsService],
  exports: [SmsService],
})
export class SmsModule {}
