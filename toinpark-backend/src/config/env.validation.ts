import { z } from 'zod';

export const envSchema = z.object({
  // ======================
  // APPLICATION
  // ======================
  NODE_ENV: z
    .enum(['development', 'production', 'test', 'staging'])
    .default('development'),
  PORT: z.coerce.number().min(1000).max(65535).default(3000),
  API_PREFIX: z.string().default('api/v1'),

  // ======================
  // DATABASE
  // ======================
  DATABASE_URL: z.string().url(),

  // ======================
  // JWT
  // ======================
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.coerce.number().default(604800), // 7 days in seconds
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_REFRESH_EXPIRES_IN: z.coerce.number().default(2592000), // 30 days in seconds

  // ======================
  // CORS
  // ======================
  CORS_ORIGIN: z.string().default('*'),

  // ======================
  // OTP settings
  // ======================
  MAX_OTP_FAIL_COUNT: z.string().default('*'),
  MAX_RESEND_OTP_COUNT: z.string().default('*'),
  MAX_WRONG_PASSWORD_FAIL_COUNT: z.string().default('*'),
  MAX_EMAIL_CHANGE_COUNT: z.string().default('*'),
  MAX_PHONE_CHANGE_COUNT: z.string().default('*'),
  LOCKOUT_DURATION_MINUTES: z.string().default('*'),
  OTP_EXPIRE_DURATION_MINUTES: z.string().default('*'),
  // ======================
  // THROTTLE/RATE LIMITING
  // ======================
  THROTTLE_TTL: z.coerce.number().default(60),
  THROTTLE_LIMIT: z.coerce.number().default(10),

  // ======================
  // SWAGGER
  // ======================
  SWAGGER_ENABLED: z.coerce.boolean().default(true),
  SWAGGER_PATH: z.string().default('docs'),
  SWAGGER_TITLE: z.string().default('API Documentation'),
  SWAGGER_DESCRIPTION: z.string().default('API Documentation'),
  SWAGGER_VERSION: z.string().default('1.0.0'),
  SWAGGER_USER: z.string().default('admin'),
  SWAGGER_PASSWORD: z.string().min(6).default('admin123'),
  DAY_FOR_STAKING_BEFORE_INIT: z.coerce.number().default(3),

  // ======================
  // MAIL
  // ======================
  MAIL_PROVIDER: z
    .enum(['sendgrid', 'mailtrap', 'aws-ses'])
    .default('sendgrid'),
  MAIL_FROM_EMAIL: z.string().email().default('noreply@example.com'),
  MAIL_FROM_NAME: z.string().default('TOI Platform'),

  // SendGrid
  SENDGRID_API_KEY: z.string().optional(),

  // Mailtrap
  MAILTRAP_HOST: z.string().optional(),
  MAILTRAP_PORT: z.coerce.number().optional(),
  MAILTRAP_USER: z.string().optional(),
  MAILTRAP_PASS: z.string().optional(),

  // AWS SES (for future use)
  AWS_SES_REGION: z.string().optional(),
  AWS_SES_ACCESS_KEY_ID: z.string().optional(),
  AWS_SES_SECRET_ACCESS_KEY: z.string().optional(),

  // ======================
  // SMS
  // ======================
  SMS_PROVIDER: z.enum(['twilio']).default('twilio'),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_FROM_NUMBER: z.string().optional(),
  TWILIO_MESSAGING_SERVICE_SID: z.string().optional(),

  BASE_URL: z.string().url(),
});

export type Environment = z.infer<typeof envSchema>;

export function validateEnvironment(
  config: Record<string, unknown>,
): Environment {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err) => {
        const path = err.path.join('.');
        return `  ❌ ${path}: ${err.message}`;
      });
      throw new Error(
        `\n⚠️  Environment validation failed:\n${errors.join('\n')}\n`,
      );
    }
    throw error;
  }
}
