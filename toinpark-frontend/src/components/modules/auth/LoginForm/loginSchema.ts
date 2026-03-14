import { EUserSignUpType } from "@/store/api/auth/auth.types";
import { z } from "zod";

export const loginSchema = z
  .object({
    type: z.enum([EUserSignUpType.EMAIL, EUserSignUpType.PHONE]),
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    identifier: z.string().optional(),
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

export type TLoginSchema = z.infer<typeof loginSchema>;
