import { z } from "zod";

export const usdtWalletAddressFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  walletAddress: z.string().min(2, "Wallet address is required"),
  image: z.string().min(2, "Image is required"),
  isActive: z.boolean(),
});

export type TAddUSDTWalletAddressFormData = z.infer<
  typeof usdtWalletAddressFormSchema
>;
