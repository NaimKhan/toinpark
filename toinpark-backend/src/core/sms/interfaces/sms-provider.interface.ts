/**
 * SMS Provider Interface
 * ========================
 * Abstract contract that all SMS providers must implement.
 */

export interface ISmsOptions {
  to: string;
  message: string;
}

export interface ISmsResponse {
  success: boolean;
  messageId?: string;
  provider: string;
  timestamp: Date;
  error?: string;
  rawResponse?: unknown;
}

/**
 * SMS Provider Interface
 * All SMS providers (Twilio, Vonage, etc.) must implement this interface
 */
export interface ISmsProvider {
  /**
   * Provider name for identification
   */
  readonly name: string;

  /**
   * Send a single SMS
   */
  send(options: ISmsOptions): Promise<ISmsResponse>;

  /**
   * Verify provider connection/configuration
   */
  verifyConnection(): Promise<boolean>;
}

/**
 * Injection token for the SMS provider
 */
export const SMS_PROVIDER = Symbol('SMS_PROVIDER');
