/**
 * Mailtrap Mail Provider
 * =======================
 * Implementation of IMailProvider for Mailtrap using nodemailer.
 * Used for testing/staging environments.
 *
 * Required environment variables:
 * - MAILTRAP_HOST (e.g., sandbox.smtp.mailtrap.io)
 * - MAILTRAP_PORT (e.g., 2525)
 * - MAILTRAP_USER
 * - MAILTRAP_PASS
 */

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import {
  IMailProvider,
  IMailOptions,
  IMailResponse,
  IBulkMailOptions,
  IBulkMailResponse,
  IMailRecipient,
} from '../interfaces';

@Injectable()
export class MailtrapProvider implements IMailProvider {
  readonly name = 'mailtrap';
  private readonly logger = new Logger(MailtrapProvider.name);
  private readonly transporter: Transporter;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor() {
    const host = process.env.MAILTRAP_HOST;
    const port = process.env.MAILTRAP_PORT;
    const user = process.env.MAILTRAP_USER;
    const pass = process.env.MAILTRAP_PASS;

    if (!host || !port || !user || !pass) {
      throw new Error(
        'Mailtrap credentials not configured. Set MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS.',
      );
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      auth: { user, pass },
    });

    this.fromEmail = process.env.MAIL_FROM_EMAIL || 'noreply@example.com';
    this.fromName = process.env.MAIL_FROM_NAME || 'TOI Platform';

    this.logger.log('Mailtrap provider initialized');
  }

  /**
   * Send a single email via Mailtrap
   */
  async send(options: IMailOptions): Promise<IMailResponse> {
    try {
      const info = await this.transporter.sendMail({
        from: this.formatFrom(options.from),
        to: this.formatRecipients(options.to),
        cc: options.cc ? this.formatRecipients(options.cc) : undefined,
        bcc: options.bcc ? this.formatRecipients(options.bcc) : undefined,
        replyTo: options.replyTo ? this.formatRecipient(options.replyTo) : undefined,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments?.map((att) => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType,
        })),
      });

      this.logger.log(`Email sent to ${this.getRecipientString(options.to)}`);

      return {
        success: true,
        messageId: info.messageId,
        provider: this.name,
        timestamp: new Date(),
        rawResponse: info,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send email: ${errorMessage}`);

      return {
        success: false,
        provider: this.name,
        timestamp: new Date(),
        error: errorMessage,
      };
    }
  }

  /**
   * Send multiple emails in bulk
   */
  async sendBulk(options: IBulkMailOptions): Promise<IBulkMailResponse> {
    const results: IMailResponse[] = [];
    let sent = 0;
    let failed = 0;

    for (const message of options.messages) {
      const result = await this.send(message);
      results.push(result);
      if (result.success) sent++;
      else failed++;
    }

    return {
      success: failed === 0,
      total: options.messages.length,
      sent,
      failed,
      results,
    };
  }

  /**
   * Send email using a template (uses inline rendering for Mailtrap)
   */
  async sendTemplate(
    to: string | IMailRecipient,
    _templateId: string,
    templateData: Record<string, unknown>,
    options?: Partial<IMailOptions>,
  ): Promise<IMailResponse> {
    // Mailtrap doesn't have dynamic templates like SendGrid
    // Just send with provided options
    return this.send({
      to,
      subject: options?.subject || 'Notification',
      html: options?.html || JSON.stringify(templateData),
      text: options?.text,
      ...options,
    });
  }

  /**
   * Verify Mailtrap connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Mailtrap connection verified');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Mailtrap connection failed: ${errorMessage}`);
      return false;
    }
  }

  private formatFrom(from?: string | IMailRecipient): string {
    if (!from) {
      return `"${this.fromName}" <${this.fromEmail}>`;
    }
    if (typeof from === 'string') {
      return from;
    }
    return from.name ? `"${from.name}" <${from.email}>` : from.email;
  }

  private formatRecipient(recipient: string | IMailRecipient): string {
    if (typeof recipient === 'string') return recipient;
    return recipient.name ? `"${recipient.name}" <${recipient.email}>` : recipient.email;
  }

  private formatRecipients(
    recipients: string | string[] | IMailRecipient | IMailRecipient[],
  ): string | string[] {
    if (typeof recipients === 'string') return recipients;
    if (Array.isArray(recipients)) {
      return recipients.map((r) => this.formatRecipient(r));
    }
    return this.formatRecipient(recipients);
  }

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
