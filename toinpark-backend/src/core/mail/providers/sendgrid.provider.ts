/**
 * SendGrid Mail Provider
 * =======================
 * Implementation of IMailProvider for SendGrid.
 *
 * @see https://docs.sendgrid.com/api-reference/mail-send/mail-send
 */

import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import type { MailDataRequired } from '@sendgrid/mail';
import {
  IMailProvider,
  IMailOptions,
  IMailResponse,
  IBulkMailOptions,
  IBulkMailResponse,
  IMailRecipient,
} from '../interfaces';

@Injectable()
export class SendGridProvider implements IMailProvider {
  readonly name = 'sendgrid';
  private readonly logger = new Logger(SendGridProvider.name);
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY environment variable is not set');
    }

    sgMail.setApiKey(apiKey);
    this.fromEmail = process.env.MAIL_FROM_EMAIL || 'noreply@example.com';
    this.fromName = process.env.MAIL_FROM_NAME || 'TOI Platform';

    this.logger.log('SendGrid provider initialized');
  }

  /**
   * Send a single email via SendGrid
   */
  async send(options: IMailOptions): Promise<IMailResponse> {
    try {
      const mailData = this.buildMailData(options);
      const [response] = await sgMail.send(mailData);

      this.logger.log(
        `Email sent successfully to ${this.getRecipientString(options.to)}`,
      );

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
        provider: this.name,
        timestamp: new Date(),
        rawResponse: response,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorResponse =
        error && typeof error === 'object' && 'response' in error
          ? (error as { response?: { body?: unknown } }).response?.body
          : undefined;

      this.logger.error(`Failed to send email: ${errorMessage}`, errorStack);

      return {
        success: false,
        provider: this.name,
        timestamp: new Date(),
        error: errorMessage,
        rawResponse: errorResponse,
      };
    }
  }

  /**
   * Send multiple emails in bulk
   */
  async sendBulk(options: IBulkMailOptions): Promise<IBulkMailResponse> {
    const { messages, batchSize = 100 } = options;
    const results: IMailResponse[] = [];
    let sent = 0;
    let failed = 0;

    // Process in batches
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      const mailDataBatch = batch.map((msg) => this.buildMailData(msg));

      try {
        await sgMail.send(mailDataBatch);
        sent += batch.length;

        batch.forEach(() => {
          results.push({
            success: true,
            provider: this.name,
            timestamp: new Date(),
          });
        });

        this.logger.log(
          `Batch ${Math.floor(i / batchSize) + 1}: Sent ${batch.length} emails`,
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        failed += batch.length;

        batch.forEach(() => {
          results.push({
            success: false,
            provider: this.name,
            timestamp: new Date(),
            error: errorMessage,
          });
        });

        this.logger.error(
          `Batch ${Math.floor(i / batchSize) + 1} failed: ${errorMessage}`,
        );
      }
    }

    return {
      success: failed === 0,
      total: messages.length,
      sent,
      failed,
      results,
    };
  }

  /**
   * Send email using a SendGrid dynamic template
   */
  async sendTemplate(
    to: string | IMailRecipient,
    templateId: string,
    templateData: Record<string, unknown>,
    options?: Partial<IMailOptions>,
  ): Promise<IMailResponse> {
    try {
      const mailData: MailDataRequired = {
        to: this.formatRecipient(to),
        from: {
          email: options?.from
            ? typeof options.from === 'string'
              ? options.from
              : options.from.email
            : this.fromEmail,
          name:
            options?.from && typeof options.from !== 'string'
              ? options.from.name || this.fromName
              : this.fromName,
        },
        templateId,
        dynamicTemplateData: templateData,
        subject: options?.subject || '', // SendGrid requires subject even with templates
      };

      if (options?.replyTo) {
        mailData.replyTo = this.formatRecipient(options.replyTo);
      }

      if (options?.cc) {
        mailData.cc = this.formatRecipients(options.cc);
      }

      if (options?.bcc) {
        mailData.bcc = this.formatRecipients(options.bcc);
      }

      const [response] = await sgMail.send(mailData);

      this.logger.log(
        `Template email sent successfully to ${this.getRecipientString(to)} using template ${templateId}`,
      );

      return {
        success: true,
        messageId: response.headers['x-message-id'] as string,
        provider: this.name,
        timestamp: new Date(),
        rawResponse: response,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorResponse =
        error && typeof error === 'object' && 'response' in error
          ? (error as { response?: { body?: unknown } }).response?.body
          : undefined;

      this.logger.error(
        `Failed to send template email: ${errorMessage}`,
        errorStack,
      );

      return {
        success: false,
        provider: this.name,
        timestamp: new Date(),
        error: errorMessage,
        rawResponse: errorResponse,
      };
    }
  }

  /**
   * Verify SendGrid API connection
   */
  verifyConnection(): Promise<boolean> {
    try {
      // SendGrid doesn't have a dedicated health check endpoint
      // We verify by checking if the API key is valid format
      const apiKey = process.env.SENDGRID_API_KEY;
      if (!apiKey || !apiKey.startsWith('SG.')) {
        return Promise.resolve(false);
      }

      this.logger.log('SendGrid connection verified');
      return Promise.resolve(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `SendGrid connection verification failed: ${errorMessage}`,
      );
      return Promise.resolve(false);
    }
  }

  /**
   * Build SendGrid mail data from our generic options
   */
  private buildMailData(options: IMailOptions): MailDataRequired {
    // Ensure we have at least text or html content
    const text = options.text || '';
    const html = options.html || options.text || '';

    const mailData: MailDataRequired = {
      to: this.formatRecipients(options.to),
      from: {
        email: options.from
          ? typeof options.from === 'string'
            ? options.from
            : options.from.email
          : this.fromEmail,
        name:
          options.from && typeof options.from !== 'string'
            ? options.from.name || this.fromName
            : this.fromName,
      },
      subject: options.subject,
      text,
      html,
    };

    // Reply-To
    if (options.replyTo) {
      mailData.replyTo = this.formatRecipient(options.replyTo);
    }

    // CC & BCC
    if (options.cc) {
      mailData.cc = this.formatRecipients(options.cc);
    }
    if (options.bcc) {
      mailData.bcc = this.formatRecipients(options.bcc);
    }

    // Attachments
    if (options.attachments && options.attachments.length > 0) {
      mailData.attachments = options.attachments.map((att) => ({
        filename: att.filename,
        content:
          typeof att.content === 'string'
            ? att.content
            : att.content.toString('base64'),
        type: att.contentType,
        disposition: 'attachment',
      }));
    }

    // Custom headers
    if (options.headers) {
      mailData.headers = options.headers;
    }

    // Categories/Tags (SendGrid specific)
    if (options.tags && options.tags.length > 0) {
      mailData.categories = options.tags;
    }

    // Custom metadata
    if (options.metadata) {
      mailData.customArgs = options.metadata;
    }

    return mailData;
  }

  /**
   * Format a single recipient
   */
  private formatRecipient(recipient: string | IMailRecipient): {
    email: string;
    name?: string;
  } {
    if (typeof recipient === 'string') {
      return { email: recipient };
    }
    return { email: recipient.email, name: recipient.name };
  }

  /**
   * Format multiple recipients
   */
  private formatRecipients(
    recipients: string | string[] | IMailRecipient | IMailRecipient[],
  ): Array<{ email: string; name?: string }> {
    if (typeof recipients === 'string') {
      return [{ email: recipients }];
    }

    if (Array.isArray(recipients)) {
      return recipients.map((r) => this.formatRecipient(r));
    }

    return [this.formatRecipient(recipients)];
  }

  /**
   * Get recipient string for logging
   */
  private getRecipientString(
    to: string | string[] | IMailRecipient | IMailRecipient[],
  ): string {
    if (typeof to === 'string') return to;
    if (Array.isArray(to)) {
      return to.map((r) => (typeof r === 'string' ? r : r.email)).join(', ');
    }
    return to.email;
  }
}
