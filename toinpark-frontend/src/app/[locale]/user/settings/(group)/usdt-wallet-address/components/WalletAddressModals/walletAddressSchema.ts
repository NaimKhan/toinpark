import { z } from "zod";

export const walletAddressSchema = z.object({
  name: z.string().min(1, "Label is required"),
  walletAccountId: z.string().min(1, "Wallet address is required"),
});

export type TAddWalletAddressFormData = z.infer<typeof walletAddressSchema>;
