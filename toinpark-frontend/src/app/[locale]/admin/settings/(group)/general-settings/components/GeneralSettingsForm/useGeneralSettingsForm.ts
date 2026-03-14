"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generalSettingsSchema,
  TGeneralSettingsFormData,
} from "./generalSettingsSchema";

export function useGeneralSettingsForm(
  defaultValues?: Partial<TGeneralSettingsFormData>
) {
  const safeDefaults: TGeneralSettingsFormData = {
    siteTitle: defaultValues?.siteTitle ?? "",
    organizationEmail: defaultValues?.organizationEmail ?? "CONFERENCE",
    airdropEventMessage: defaultValues?.airdropEventMessage ?? undefined,
    telegram: defaultValues?.telegram ?? "",
    whatsApp: defaultValues?.whatsApp ?? "",
    facebookUrl: defaultValues?.facebookUrl ?? "",
    youtubeUrl: defaultValues?.youtubeUrl ?? "",
    linkedinUrl: defaultValues?.linkedinUrl ?? "",
    instagramUrl: defaultValues?.instagramUrl ?? "",
    kycBonusToin: defaultValues?.kycBonusToin ?? undefined,
    socialBonusToin: defaultValues?.socialBonusToin ?? undefined,
    entryBonusToin: defaultValues?.entryBonusToin ?? undefined,
    // favicon: defaultValues?.favicon ?? "",
    // logo: defaultValues?.logo ?? "",
  };

  return useForm<TGeneralSettingsFormData>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: safeDefaults,
  });
}
