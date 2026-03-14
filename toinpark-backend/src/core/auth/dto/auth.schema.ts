import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Login Schema
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'), // email/phone/username
  password: z.string().trim().min(1, { message: "Password is required" }).min(8, 'Password must be at least 6 characters'),
});

export type LoginDto = z.infer<typeof loginSchema>;

// Reusable Name Schema
const nameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(50, { message: 'Name must not exceed 50 characters' })
  .regex(
    /^[A-Za-z][A-Za-z\s\-'.]*[A-Za-z]$/,
    "Name must contain only letters, spaces, hyphen (-), apostrophe ('), or dot (.), and cannot start or end with special characters"
  );

// Register Schema
export const RegisterRequestSchema = z
  .object({
    identifierType: z
      .string()
      .trim()
      .min(1, { message: 'IdentifierType is required' })
      .refine((val) => ['email', 'phone'].includes(val.toLowerCase()), {
        message: 'IdentifierType must be either "email" or "phone"',
      }),

    identifier: z.string().trim().min(1, { message: 'Identifier is required' }),

    password: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password must not exceed 20 characters' })
      .refine(
        (val) => !/(.)\1{3,}/.test(val),
        { message: 'Password cannot contain 4 or more repeated characters in a row' }
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol (@$!%*?&#^)',
      ),

    passwordConfirmation: z
      .string()
      .trim()
      .min(1, { message: 'Password confirmation is required' }),

    firstName: nameSchema,
    lastName: nameSchema,
    referralCode: z.string().trim().optional(),

  })
  .superRefine((data, ctx) => {
    const { identifierType, identifier, password, passwordConfirmation } = data;

    // ✅ Email validation
    if (identifierType.toLowerCase() === 'email') {
      const emailResult = z.string().email().safeParse(identifier);

      if (!emailResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Invalid email format',
        });
        return;
      }

      // Minimum and maximum length
      if (identifier.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Email must be at least 5 characters',
        });
      }

      if (identifier.length > 64) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Email must not exceed 64 characters',
        });
      }

      // 👇 Business rule: Gmail must end with .com
      const domain = identifier.split('@')[1]?.toLowerCase();

      if (domain === 'gmail.co') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Gmail addresses must end with @gmail.com',
        });
      }

      // Prevent continuous repeated characters (4 or more)
      if (/(.)\1{3,}/.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Email cannot contain 4 or more continuous repeated characters',
        });
      }
    }

    // ✅ Phone validation (basic pattern for international phone numbers)
    if (identifierType.toLowerCase() === 'phone') {
      const phoneForValidation = identifier.startsWith('+') ? identifier : `+${identifier}`;
      const phoneNumber = parsePhoneNumberFromString(phoneForValidation);
      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['identifier'],
          message: 'Invalid phone number format',
        });
      }
    }

    // ✅ Password confirmation validation
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
        message: 'Password confirmation does not match password',
      });
    }

  });

export type RegisterDto = z.infer<typeof RegisterRequestSchema>;




export const RegisterOTPRequestSchema = z.object({
  otpUniqueKey: z.string().trim().min(1, { message: "OTP Unique Key is required" }),
  otp: z.string().trim().min(1, { message: "OTP is required" }).regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});
export type otpRequestModelDto = z.infer<typeof RegisterOTPRequestSchema>;




export const ResendRegisterOTPRequestSchema = z.object({
  otpUniqueKey: z.string().trim().min(1, { message: "OTP Unique Key is required" }),
});
export type ResendRegisterOTPRequestModelDto = z.infer<typeof ResendRegisterOTPRequestSchema>;






// Refresh Token Schema
export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, 'Refresh token is required'),
});
export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;

// Forgot Password Schema
export const ForgotPasswordRequestSchema = z.object({
  identifier: z.string().trim().min(1, { message: 'Identifier (email or phone) is required' }),
});

export type ForgotPasswordRequestDto = z.infer<typeof ForgotPasswordRequestSchema>;


export const ResetPasswordRequestSchema = z.object({
  otpUniqueKey: z.string().trim().min(1, { message: 'OTP Unique Key is required' }),
  otp: z.string().trim().min(1, { message: 'OTP is required' }),
  newPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol (@$!%*?&#^)',
    ),
  passwordConfirmation: z
    .string()
    .trim()
    .min(1, { message: 'Password confirmation is required' }),

}).superRefine((data, ctx) => {
  const { newPassword, passwordConfirmation } = data;

  // ✅ Password confirmation validation
  if (newPassword !== passwordConfirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passwordConfirmation'],
      message: 'Password confirmation does not match password',
    });
  }

});

export type ResetPasswordRequestDto = z.infer<typeof ResetPasswordRequestSchema>;


export const ChangePasswordRequestSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol (@$!%*?&#^)',
    ),
  newPassword: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol (@$!%*?&#^)',
    ),
  passwordConfirmation: z
    .string()
    .trim()
    .min(1, { message: 'Password confirmation is required' }),

}).superRefine((data, ctx) => {
  const { newPassword, passwordConfirmation } = data;

  // ✅ Password confirmation validation
  if (newPassword !== passwordConfirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['passwordConfirmation'],
      message: 'Password confirmation does not match password',
    });
  }

});

export type ChangePasswordRequestDto = z.infer<typeof ChangePasswordRequestSchema>;