import { z } from "zod";
import { EUserSignUpType } from "@/store/api/auth/auth.types";

export const forgotPasswordSchema = z
  .object({
    type: z.enum([EUserSignUpType.EMAIL, EUserSignUpType.PHONE]),
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === EUserSignUpType.EMAIL) {
      if (!data.email || data.email.trim() === "") {
        ctx.addIssue({
          path: ["email"],
          code: "custom",
          message: "Email is required",
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({
          path: ["email"],
          code: "custom",
          message: "Invalid email address",
        });
      }
    }

    if (data.type === EUserSignUpType.PHONE) {
      if (!data.phone || data.phone.trim() === "") {
        ctx.addIssue({
          path: ["phone"],
          code: "custom",
          message: "Phone number is required",
        });
      }
    }
  });

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
