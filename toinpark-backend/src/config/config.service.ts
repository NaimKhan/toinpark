import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Environment } from './env.validation';

@Injectable()
export class ConfigService {
  constructor(
    private readonly configService: NestConfigService<Environment, true>,
  ) { }

  // ======================
  // APPLICATION
  // ======================

  get baseUrl(): string {
    return this.configService.get('BASE_URL', { infer: true });
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  get apiPrefix(): string {
    return this.configService.get('API_PREFIX', { infer: true });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get isStaging(): boolean {
    return this.nodeEnv === 'staging';
  }

  // ======================
  // DATABASE
  // ======================

  get databaseUrl(): string {
    return this.configService.get('DATABASE_URL', { infer: true });
  }

  // ======================
  // JWT
  // ======================

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET', { infer: true });
  }

  get jwtExpiresIn(): number {
    return this.configService.get('JWT_EXPIRES_IN', { infer: true });
  }

  get jwtRefreshSecret(): string {
    return this.configService.get('JWT_REFRESH_SECRET', { infer: true });
  }

  get jwtRefreshExpiresIn(): number {
    return this.configService.get('JWT_REFRESH_EXPIRES_IN', { infer: true });
  }

  // ======================
  // CORS
  // ======================

  get corsOrigin(): string {
    return this.configService.get('CORS_ORIGIN', { infer: true });
  }

  // ======================
  // Otp Settings
  // ======================

  get maxOtpFailCount(): number {
    return this.configService.get('MAX_OTP_FAIL_COUNT', { infer: true });
  }

  get maxResendOtpCount(): number {
    return this.configService.get('MAX_RESEND_OTP_COUNT', { infer: true });
  }

  get maxEmailChangeCount(): number {
    return this.configService.get('MAX_EMAIL_CHANGE_COUNT', { infer: true });
  }

  get maxPhoneChangeCount(): number {
    return this.configService.get('MAX_PHONE_CHANGE_COUNT', { infer: true });
  }

  get maxWrongPasswordFailCount(): number {
    return this.configService.get('MAX_WRONG_PASSWORD_FAIL_COUNT', { infer: true });
  }

  get lockoutDurationMinutes(): number {
    return this.configService.get('LOCKOUT_DURATION_MINUTES', { infer: true });
  }

  get otpDurationMinutes(): number {
    return this.configService.get('OTP_EXPIRE_DURATION_MINUTES', { infer: true });
  }


  // ======================
  // THROTTLE
  // ======================

  get throttleTtl(): number {
    return this.configService.get('THROTTLE_TTL', { infer: true });
  }

  get throttleLimit(): number {
    return this.configService.get('THROTTLE_LIMIT', { infer: true });
  }

  // ======================
  // OTP SETTINGS
  // ======================

  get otpMaxFailCount(): number {
    return this.configService.get('MAX_OTP_FAIL_COUNT', { infer: true });
  }

  // ======================
  // SWAGGER
  // ======================

  get swaggerEnabled(): boolean {
    return this.configService.get('SWAGGER_ENABLED', { infer: true });
  }

  get swaggerPath(): string {
    return this.configService.get('SWAGGER_PATH', { infer: true });
  }

  get swaggerTitle(): string {
    return this.configService.get('SWAGGER_TITLE', { infer: true });
  }

  get swaggerDescription(): string {
    return this.configService.get('SWAGGER_DESCRIPTION', { infer: true });
  }

  get swaggerVersion(): string {
    return this.configService.get('SWAGGER_VERSION', { infer: true });
  }

  get swaggerUser(): string {
    return this.configService.get('SWAGGER_USER', { infer: true });
  }

  get swaggerPassword(): string {
    return this.configService.get('SWAGGER_PASSWORD', { infer: true });
  }

  // ======================
  // STAKING
  // ======================

  get dayForInitStakingBonus(): number {
    return this.configService.get('DAY_FOR_STAKING_BEFORE_INIT', {
      infer: true,
    });
  }

  // ======================
  // MAIL
  // ======================

  get mailProvider(): string {
    return this.configService.get('MAIL_PROVIDER', { infer: true });
  }

  get mailFromEmail(): string {
    return this.configService.get('MAIL_FROM_EMAIL', { infer: true });
  }

  get mailFromName(): string {
    return this.configService.get('MAIL_FROM_NAME', { infer: true });
  }

  get sendgridApiKey(): string {
    return this.configService.get('SENDGRID_API_KEY', { infer: true });
  }

  get awsSesRegion(): string {
    return this.configService.get('AWS_SES_REGION', { infer: true });
  }

  get awsSesAccessKeyId(): string {
    return this.configService.get('AWS_SES_ACCESS_KEY_ID', { infer: true });
  }

  get awsSesSecretAccessKey(): string {
    return this.configService.get('AWS_SES_SECRET_ACCESS_KEY', { infer: true });
  }

  /**
   * Get all mail configuration as an object
   * Useful for passing to mail providers
   */
  get mailConfig() {
    return {
      provider: this.mailProvider,
      fromEmail: this.mailFromEmail,
      fromName: this.mailFromName,
      sendgrid: {
        apiKey: this.sendgridApiKey,
      },
      awsSes: {
        region: this.awsSesRegion,
        accessKeyId: this.awsSesAccessKeyId,
        secretAccessKey: this.awsSesSecretAccessKey,
      },
    };
  }

  // ======================
  // SMS
  // ======================

  get smsProvider(): string {
    return this.configService.get('SMS_PROVIDER', { infer: true });
  }

  get twilioAccountSid(): string {
    return this.configService.get('TWILIO_ACCOUNT_SID', { infer: true });
  }

  get twilioAuthToken(): string {
    return this.configService.get('TWILIO_AUTH_TOKEN', { infer: true });
  }

  get twilioFromNumber(): string {
    return this.configService.get('TWILIO_FROM_NUMBER', { infer: true });
  }

  get twilioMessagingServiceSid(): string {
    return this.configService.get('TWILIO_MESSAGING_SERVICE_SID', { infer: true });
  }

  get smsConfig() {
    return {
      provider: this.smsProvider,
      twilio: {
        accountSid: this.twilioAccountSid,
        authToken: this.twilioAuthToken,
        fromNumber: this.twilioFromNumber,
        messagingServiceSid: this.twilioMessagingServiceSid,
      },
    };
  }
}
