import { EUserSignUpType } from "@/store/api/auth/auth.types";
import { z } from "zod";

export const registerSchema = z
  .object({
    type: z.enum([EUserSignUpType.EMAIL, EUserSignUpType.PHONE]),
    email: z.string().optional(),
    phone: z.string().optional(),
    identifier: z.string().optional(),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    passwordConfirmation: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    // Email validation when type is EMAIL
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
          message: "Please enter a valid email address",
        });
      }
    }

    // Phone validation when type is PHONE
    if (data.type === EUserSignUpType.PHONE) {
      if (!data.phone || data.phone.trim() === "") {
        ctx.addIssue({
          path: ["phone"],
          code: "custom",
          message: "Phone number is required",
        });
      }
    }

    // Password match validation
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        path: ["passwordConfirmation"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
