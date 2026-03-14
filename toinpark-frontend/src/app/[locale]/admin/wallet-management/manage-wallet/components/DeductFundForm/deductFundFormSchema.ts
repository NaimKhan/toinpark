import { z } from "zod";

export const deductFundFormSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  userName: z.string().optional(),
  toinAmount: z.number().min(0, "Amount must be non-negative").optional(),
  USDAmount: z.number().min(0, "Amount must be non-negative").optional(),
  remark: z.string().optional(),
  walletType: z.enum(["capital", "ewallet"]),
  stakingPackageId: z.string().min(1, "Staking Package is required"),
});

export type TDeductFundForm = z.infer<typeof deductFundFormSchema>;
