/**
 * Mail Service
 * =============
 * Main service for sending emails. This acts as a facade over the mail providers,
 * providing a clean API for the rest of the application.
 *
 * The actual provider (SendGrid, AWS SES, etc.) is injected dynamically based on
 * the MAIL_PROVIDER environment variable.
 *
 * @example
 * // Inject and use in any service/controller
 * constructor(private readonly mailService: MailService) {}
 *
 * // Send a simple email
 * await this.mailService.send({
 *   to: 'user@example.com',
 *   subject: 'Welcome!',
 *   html: '<h1>Welcome to TOI Platform</h1>',
 * });
 *
 * // Send using a pre-built template
 * await this.mailService.sendWelcomeEmail('user@example.com', 'John');
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  IMailProvider,
  IMailOptions,
  IMailResponse,
  IBulkMailOptions,
  IBulkMailResponse,
  IMailRecipient,
  MAIL_PROVIDER,
} from './interfaces';
import {
  welcomeTemplate,
  commonOtpTemplate,
  CommonOtpTemplateData,
} from './templates';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(MAIL_PROVIDER)
    private readonly mailProvider: IMailProvider,
  ) {
    this.logger.log(
      `Mail service initialized with provider: ${this.mailProvider.name}`,
    );
  }

  /**
   * Get the current provider name
   */
  getProviderName(): string {
    return this.mailProvider.name;
  }

  /**
   * Send a single email
   */
  async send(options: IMailOptions): Promise<IMailResponse> {
    this.logger.debug(
      `Sending email to ${this.getRecipientString(options.to)}`,
    );
    return this.mailProvider.send(options);
  }

  /**
   * Send multiple emails in bulk
   */
  async sendBulk(options: IBulkMailOptions): Promise<IBulkMailResponse> {
    this.logger.debug(
      `Sending bulk emails: ${options.messages.length} messages`,
    );
    return this.mailProvider.sendBulk(options);
  }

  /**
   * Send email using a provider template
   */
  async sendTemplate(
    to: string | IMailRecipient,
    templateId: string,
    templateData: Record<string, unknown>,
    options?: Partial<IMailOptions>,
  ): Promise<IMailResponse> {
    this.logger.debug(
      `Sending template email to ${this.getRecipientString(to)} using template ${templateId}`,
    );
    return this.mailProvider.sendTemplate(
      to,
      templateId,
      templateData,
      options,
    );
  }

  /**
   * Verify the mail provider connection
   */
  async verifyConnection(): Promise<boolean> {
    return this.mailProvider.verifyConnection();
  }

  // ============================================================
  // Convenience Methods - Pre-built email types for your app
  // ============================================================

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(
    to: string | IMailRecipient,
    userName: string,
    loginUrl?: string,
  ): Promise<IMailResponse> {
    const recipientEmail = typeof to === 'string' ? to : to.email;
    const recipientName =
      typeof to === 'string' ? userName : to.name || userName;

    const template = welcomeTemplate({
      recipientName,
      recipientEmail,
      loginUrl,
    });

    return this.send({
      to,
      ...template,
    });
  }


  /**
   * Send OTP email using the common OTP template
   * 
   * @param to - Recipient email
   * @param otp - OTP code
   * @param subject - Email subject (default: 'Your Verification Code')
   * @param purpose - Purpose description (default: 'verification')
   * @param expiresInMinutes - Optional expiry time (hidden if not provided)
   * @param logoUrl - Optional logo URL from system settings
   */
  async sendOtpEmail(
    to: string | IMailRecipient,
    otp: string,
    subject: string = 'OTP Verification Code',
    body: string = 'OTP Verification Code',
    expiresInMinutes?: number,
    logoUrl?: string,
  ): Promise<IMailResponse> {
    const templateData: CommonOtpTemplateData = {
      otp,
      subject,
      body,
      expiresInMinutes,
      logoUrl,
      companyName: 'TOI Platform',
    };

    const template = commonOtpTemplate(templateData);

    return this.send({
      to,
      ...template,
    });
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
