import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISmsProvider, ISmsOptions, ISmsResponse, SMS_PROVIDER } from './interfaces/sms-provider.interface';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    @Inject(SMS_PROVIDER)
    private readonly smsProvider: ISmsProvider,
  ) {
    this.logger.log(`Sms service initialized with provider: ${this.smsProvider.name}`);
  }

  /**
   * Send a single SMS
   */
  async send(options: ISmsOptions): Promise<ISmsResponse> {
    this.logger.debug(`Sending SMS to ${options.to}`);
    return this.smsProvider.send(options);
  }

  /**
   * Send OTP SMS
   */
  async sendOtpSms(to: string, otp: string, body: string = 'Your OTP code is',  expireMinutes?: number): Promise<ISmsResponse> {
    const message = expireMinutes ? `${body} ${otp}. It will expire in ${expireMinutes} minutes.` : `${body} ${otp}.`;
    return this.send({ to, message });
  }

  
  /**
   * Verify the SMS provider connection
   */
  async verifyConnection(): Promise<boolean> {
    return this.smsProvider.verifyConnection();
  }
}
