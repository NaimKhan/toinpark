import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10,15}$/, "Invalid phone number"),
});

export type TUserProfileSchema = z.infer<typeof userProfileSchema>;
