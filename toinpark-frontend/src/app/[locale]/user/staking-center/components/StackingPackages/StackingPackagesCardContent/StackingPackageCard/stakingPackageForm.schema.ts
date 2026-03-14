import { z } from "zod";

export const stakingPackageFormSchema = z.object({
  toinAmount: z
    .number("Toins must be a number")
    .min(0.0001, "Toins must be greater than 0"),

  USDAmount: z
    .number("USD must be a number")
    .min(0.01, "USD must be greater than 0"),

  paymentMethod: z.string().min(1, "Payment method is required"),
});

export type TStakingPackageForm = z.infer<typeof stakingPackageFormSchema>;
