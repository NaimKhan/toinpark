import { z } from "zod";

const baseMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  stateId: z.string().optional(),
  countryId: z.string().optional(),
  zipCode: z.string().optional(),
});

export const addMemberSchema = baseMemberSchema.extend({
  userName: z.string().min(1, "Username is required"),
});

export const memberSchema = baseMemberSchema;

export type TMemberFormData = z.infer<typeof addMemberSchema>;
export type TEditMemberFormData = z.infer<typeof memberSchema>;
