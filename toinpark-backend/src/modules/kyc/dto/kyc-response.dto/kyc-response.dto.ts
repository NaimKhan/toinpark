import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, isString, Matches, MaxLength, MinLength, Validate, validate, ValidateIf } from "class-validator";
import parsePhoneNumberFromString, { isValidPhoneNumber } from "libphonenumber-js";
import z from "zod";
import { IsValidGmail } from "../validation/emailValidationFunction";
import { IsValidPhoneNumber } from "../validation/phoneValidationFunction";

export class newEmailOrPhoneEnterRequestModelDTO {
    @ApiProperty({
        example: 'email or phone',
        description: 'User new email or phone',
    })
    newEmailOrPhone: string;

    @ApiProperty({
        example: 'logId',
        description: 'User log id',
    })
    logId?: string | null;
}

export class NewEmailOrPhoneEnterRequestDTO {
    @IsString()
    @MinLength(1, { message: 'Identifier is required' })
    @Validate(IsValidGmail)
    @Validate(IsValidPhoneNumber)
    newEmailOrPhone: string;

    @IsOptional()
    @IsString()
    logId?: string;

}



export class VerifyOtpDto {
    @ApiProperty({
        description: 'Unique OTP key',
        example: 'abc123xyz',
    })
    @IsString()
    @IsNotEmpty()
    otpUniqueKey: string;

    @ApiProperty({
        description: 'One Time Password',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    otp: string;
}

export const newEmailOrPhoneEnterRequestModelSchema = z
    .object({
        newEmailOrPhone: z.string().trim().optional(),
        logId: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {

        const { newEmailOrPhone } = data;

        // ✅ Email validation
        if (newEmailOrPhone.includes('@')) {
            const emailResult = z.string().email().safeParse(newEmailOrPhone);

            if (!emailResult.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Invalid email format',
                });
                return;
            }

            // Minimum and maximum length
            if (newEmailOrPhone.length < 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Email must be at least 5 characters',
                });
            }

            if (newEmailOrPhone.length > 64) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Email must not exceed 64 characters',
                });
            }

            // 👇 Business rule: Gmail must end with .com
            const domain = newEmailOrPhone.split('@')[1]?.toLowerCase();

            if (domain === 'gmail.co') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Gmail addresses must end with @gmail.com',
                });
            }

            // Prevent continuous repeated characters (4 or more)
            if (/(.)\1{3,}/.test(newEmailOrPhone)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Email cannot contain 4 or more continuous repeated characters',
                });
            }
        }

        // ✅ Phone validation (basic pattern for international phone numbers)
        if (!newEmailOrPhone.includes('@')) {
            const phoneForValidation = newEmailOrPhone.startsWith('+') ? newEmailOrPhone : `+${newEmailOrPhone}`;
            const phoneNumber = parsePhoneNumberFromString(phoneForValidation);
            if (!phoneNumber || !phoneNumber.isValid()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ['newEmailOrPhone'], // Changed from 'identifier' to 'newEmailOrPhone'
                    message: 'Invalid phone number format',
                });
            }
        }
    });

export type newEmailOrPhoneEnterRequestModel = z.infer<typeof newEmailOrPhoneEnterRequestModelSchema>;


// export const newEmailOrPhoneEnterRequestModelSchema = z
//     .object({

//         newEmailOrPhone: z.string().trim().min(1, { message: 'Identifier is required' }),
//         logId: z.string().trim().optional(),

//     })
//     .superRefine((data, ctx) => {
//         const { newEmailOrPhone } = data;

//         // ✅ Email validation
//         if (newEmailOrPhone.includes('@')) {
//             const emailResult = z.string().email().safeParse(newEmailOrPhone);

//             if (!emailResult.success) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Invalid email format',
//                 });
//                 return;
//             }

//             // Minimum and maximum length
//             if (newEmailOrPhone.length < 5) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Email must be at least 5 characters',
//                 });
//             }

//             if (newEmailOrPhone.length > 64) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Email must not exceed 64 characters',
//                 });
//             }

//             // 👇 Business rule: Gmail must end with .com
//             const domain = newEmailOrPhone.split('@')[1]?.toLowerCase();

//             if (domain === 'gmail.co') {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Gmail addresses must end with @gmail.com',
//                 });
//             }

//             // Prevent continuous repeated characters (4 or more)
//             if (/(.)\1{3,}/.test(newEmailOrPhone)) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Email cannot contain 4 or more continuous repeated characters',
//                 });
//             }
//         }

//         // ✅ Phone validation (basic pattern for international phone numbers)
//         if (!newEmailOrPhone.includes('@')) {
//             const phoneForValidation = newEmailOrPhone.startsWith('+') ? newEmailOrPhone : `+${newEmailOrPhone}`;
//             const phoneNumber = parsePhoneNumberFromString(phoneForValidation);
//             if (!phoneNumber || !phoneNumber.isValid()) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ['newEmailOrPhone'],
//                     message: 'Invalid phone number format',
//                 });
//             }
//         }
//     });

// export type newEmailOrPhoneEnterRequestModel = z.infer<typeof newEmailOrPhoneEnterRequestModelSchema>;