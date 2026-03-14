import { z } from "zod";

export const referralMilestoneSchema = z.object({
  referralName: z.string().min(2, "Title is required"),
  isActive: z.boolean(),
  toinAmount: z.number().min(0, "Toin amount must be at least 1"),
  targetPerson: z.number().min(0, "Target person must be at least 1"),
});

export type TAddReferralMilestoneFormData = z.infer<typeof referralMilestoneSchema>;
