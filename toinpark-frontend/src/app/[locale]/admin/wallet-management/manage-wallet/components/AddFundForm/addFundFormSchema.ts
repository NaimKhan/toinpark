import { z } from "zod";

export const addFundFormSchema = z.object({
  toinAccountNumber: z.string().min(1, "User ID is required"),
  userName: z.string().optional(),
  toinAmount: z.number().min(1, "TOIN amount must be at least 1"),
  USDAmount: z.number().min(0, "USDT amount must be at least 0"),
  remark: z.string().optional(),
});

export type TAddFundForm = z.infer<typeof addFundFormSchema>;
