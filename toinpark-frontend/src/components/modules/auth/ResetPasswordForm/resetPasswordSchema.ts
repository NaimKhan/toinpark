import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be exactly 6 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    passwordConfirmation: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirmation) {
      ctx.addIssue({
        path: ["passwordConfirmation"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
