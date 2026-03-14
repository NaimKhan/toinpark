import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ISmsProvider, ISmsOptions, ISmsResponse } from '../interfaces/sms-provider.interface';

@Injectable()
export class TwilioProvider implements ISmsProvider {
  private readonly logger = new Logger(TwilioProvider.name);
  private client: Twilio;
  private fromNumber: string;
  private messagingServiceSid: string;

  readonly name = 'twilio';

  constructor() {
    this.fromNumber = process.env.TWILIO_FROM_NUMBER;
    this.messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (accountSid && authToken) {
      this.client = new Twilio(accountSid, authToken);
    }
  }

  async send(options: ISmsOptions): Promise<ISmsResponse> {
    let { to, message } = options;
    const timestamp = new Date();

    // Ensure E.164 format (must start with +)
    if (!to.startsWith('+')) {
      to = `+${to}`;
    }

    this.logger.debug(`Sending message to: ${to}`);

    if (!this.client) {
      this.logger.error('Twilio client not initialized. Check your credentials.');
      return {
        success: false,
        provider: this.name,
        timestamp,
        error: 'Twilio client not initialized',
      };
    }

    try {
      const createOptions: any = {
        body: message,
        to: to,
      };

      if (this.messagingServiceSid) {
        createOptions.messagingServiceSid = this.messagingServiceSid;
      } else {
        createOptions.from = this.fromNumber;
      }

      const result = await this.client.messages.create(createOptions);

      return {
        success: true,
        messageId: result.sid,
        provider: this.name,
        timestamp,
        rawResponse: result,
      };
    } catch (error) {
      this.logger.error(`Failed to send SMS via Twilio: ${error.message}`);
      return {
        success: false,
        provider: this.name,
        timestamp,
        error: error.message,
        rawResponse: error,
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.client) return false;
    try {
      // Small check to verify credentials - fetch account info
      await this.client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
      return true;
    } catch (error) {
      this.logger.error(`Twilio connection verification failed: ${error.message}`);
      return false;
    }
  }
}
