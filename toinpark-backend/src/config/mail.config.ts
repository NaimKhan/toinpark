/**
 * Mail Configuration
 * ===================
 * Centralized configuration for email services.
 *
 * Location: src/config/mail.config.ts
 */

import { z } from 'zod';

/**
 * Supported mail providers
 */
export const MailProviderSchema = z.enum([
  'sendgrid',
  'aws-ses',
  'azure',
  'mailgun',
]);
export type MailProvider = z.infer<typeof MailProviderSchema>;

/**
 * Mail configuration schema with Zod validation
 */
export const MailConfigSchema = z.object({
  provider: MailProviderSchema.default('sendgrid'),
  fromEmail: z.string().email().default('noreply@example.com'),
  fromName: z.string().default('TOI Platform'),

  // SendGrid specific
  sendgrid: z
    .object({
      apiKey: z.string().min(1, 'SendGrid API key is required'),
    })
    .optional(),

  // AWS SES specific (for future use)
  awsSes: z
    .object({
      region: z.string().optional(),
      accessKeyId: z.string().optional(),
      secretAccessKey: z.string().optional(),
    })
    .optional(),
});

export type MailConfig = z.infer<typeof MailConfigSchema>;

/**
 * Get and validate mail configuration from environment variables
 *
 * @returns Validated mail configuration
 * @throws ZodError if validation fails
 *
 * @example
 * const config = getMailConfig();
 * console.log(config.provider); // 'sendgrid'
 * console.log(config.sendgrid?.apiKey); // 'SG.xxx...'
 */
export const getMailConfig = (): MailConfig => {
  return MailConfigSchema.parse({
    provider: process.env.MAIL_PROVIDER || 'sendgrid',
    fromEmail: process.env.MAIL_FROM_EMAIL,
    fromName: process.env.MAIL_FROM_NAME,
    sendgrid: process.env.SENDGRID_API_KEY
      ? { apiKey: process.env.SENDGRID_API_KEY }
      : undefined,
    awsSes:
      process.env.AWS_SES_ACCESS_KEY_ID || process.env.AWS_SES_SECRET_ACCESS_KEY
        ? {
            region: process.env.AWS_SES_REGION,
            accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
          }
        : undefined,
  });
};
