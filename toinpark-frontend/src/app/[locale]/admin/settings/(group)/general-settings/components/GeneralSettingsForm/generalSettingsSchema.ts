import { z } from "zod";

export const generalSettingsSchema = z.object({
  siteTitle: z.string().min(2, "Event title is required"),
  favicon: z
    .any()
    .optional()
    .refine((value) => !value || value instanceof File, "Invalid file"),
  logo: z
    .any()
    .optional()
    .refine((value) => !value || value instanceof File, "Invalid file"),
  organizationEmail: z.email().optional(),
  airdropEventMessage: z.string().optional(),
  telegram: z.string().optional(),
  whatsApp: z.string().optional(),
  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  kycBonusToin: z.number().optional(),
  socialBonusToin: z.number().optional(),
  entryBonusToin: z.number().optional(),
  minUSDTWithdrawalAmount: z.number().optional(),
  platformWithdrawalFeePercentage: z.number().optional(),
});

export type TGeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
