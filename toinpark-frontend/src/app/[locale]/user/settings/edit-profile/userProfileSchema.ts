import { z } from "zod";

export const userProfileSchema = z.object({
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  addressLine1: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  status: z.string().optional(),
  emailDirty: z.boolean().optional(),
  phoneDirty: z.boolean().optional(),
  openVerify: z.boolean().optional(),
  verifyValue: z.string().optional(),
  verifyType: z.enum(["email", "phone"]).optional(),
  openStepTwo: z.boolean().optional(),
  flow: z.enum(["CASE_1", "CASE_2", "CASE_3"]).optional().nullable(),
  firstVerificationRes: z.any().optional(),
  stage: z.enum(["NEW_INFO", "VERIFY_NEW"]).optional(),
  newInfo: z.string().optional(),
  otpUniqueKey: z.string().optional(),
  otpError: z.string().optional(),
});

export type TUserProfileSchema = z.infer<typeof userProfileSchema>;
