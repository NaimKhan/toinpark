import { z } from "zod";

export const addStakingPackageModalSchema = z.object({
  name: z.string().min(2, "Name should not be empty"),
  dailyProfitPercent: z
    .number()
    .positive("Daily profit percent must be a positive number"),
  bonusAmount: z.number().optional(),
  maxToinAmount: z
    .number()
    .positive("Max Toin amount must be a positive number"),
  minToinAmount: z
    .number()
    .positive("Min Toin amount must be a positive number")
    .min(0.01, "Min Toin amount must be a positive number"),
  minimumDurationInDays: z
    .number()
    .min(1, "Minimum duration in days must not be less than 1"),
  recurringProfitDays: z
    .number()
    .min(1, "Recurring profit days must not be less than 1"),
  description: z.string().optional(),
});

export type TAddStakingPackageFormData = z.infer<
  typeof addStakingPackageModalSchema
>;
