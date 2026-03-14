/**
 * Mail Provider Interface
 * ========================
 * Abstract contract that all mail providers must implement.
 * This allows seamless switching between SendGrid, AWS SES, Azure, etc.
 */

export interface IMailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
  encoding?: 'base64' | 'utf-8';
}

export interface IMailRecipient {
  email: string;
  name?: string;
}

export interface IMailOptions {
  to: string | string[] | IMailRecipient | IMailRecipient[];
  subject: string;
  text?: string;
  html?: string;
  from?: string | IMailRecipient;
  replyTo?: string | IMailRecipient;
  cc?: string | string[] | IMailRecipient | IMailRecipient[];
  bcc?: string | string[] | IMailRecipient | IMailRecipient[];
  attachments?: IMailAttachment[];
  templateId?: string;
  templateData?: Record<string, unknown>;
  headers?: Record<string, string>;
  tags?: string[];
  metadata?: Record<string, string>;
}

export interface IMailResponse {
  success: boolean;
  messageId?: string;
  provider: string;
  timestamp: Date;
  error?: string;
  rawResponse?: unknown;
}

export interface IBulkMailOptions {
  messages: IMailOptions[];
  batchSize?: number;
}

export interface IBulkMailResponse {
  success: boolean;
  total: number;
  sent: number;
  failed: number;
  results: IMailResponse[];
}

/**
 * Mail Provider Interface
 * All mail providers (SendGrid, AWS SES, Azure, etc.) must implement this interface
 */
export interface IMailProvider {
  /**
   * Provider name for identification
   */
  readonly name: string;

  /**
   * Send a single email
   */
  send(options: IMailOptions): Promise<IMailResponse>;

  /**
   * Send multiple emails in bulk
   */
  sendBulk(options: IBulkMailOptions): Promise<IBulkMailResponse>;

  /**
   * Send email using a template (if provider supports it)
   */
  sendTemplate(
    to: string | IMailRecipient,
    templateId: string,
    templateData: Record<string, unknown>,
    options?: Partial<IMailOptions>,
  ): Promise<IMailResponse>;

  /**
   * Verify provider connection/configuration
   */
  verifyConnection(): Promise<boolean>;
}

/**
 * Injection token for the mail provider
 */
export const MAIL_PROVIDER = Symbol('MAIL_PROVIDER');
