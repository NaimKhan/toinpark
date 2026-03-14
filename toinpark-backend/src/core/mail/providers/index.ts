export * from './sendgrid.provider';
export * from './aws-ses.provider';
export * from './mailtrap.provider';

/**
 * Available mail providers
 * Add new providers here as they are implemented
 */
export enum MailProviderType {
  SENDGRID = 'sendgrid',
  AWS_SES = 'aws-ses',
  MAILTRAP = 'mailtrap',
  // AZURE = 'azure',
  // MAILGUN = 'mailgun',
  // POSTMARK = 'postmark',
}
