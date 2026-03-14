"use client";
import { useUpdateAGeneralSettingsMutation } from "@/store/api/system-settings/system-settings-api";
import { useEffect } from "react";
import { useGeneralSettingsForm } from "./GeneralSettingsForm/useGeneralSettingsForm";
import { TGeneralSettingsFormData } from "./GeneralSettingsForm/generalSettingsSchema";
import { useToast } from "@/components/ui/use-toast";
import { GeneralSettingsForm } from "./GeneralSettingsForm";
import { showApiToast } from "@/lib/toast/api-toast";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

export default function GeneralSettings() {
  const { toast } = useToast();

  const { getSystemSettings } = useGetSystemSettings();

  const [updateGeneralSetting, { isLoading }] =
    useUpdateAGeneralSettingsMutation();

  const form = useGeneralSettingsForm();

  useEffect(() => {
    if (getSystemSettings) {
      form.reset({
        siteTitle: getSystemSettings.siteTitle ?? "",
        organizationEmail: getSystemSettings.organizationEmail ?? "",
        airdropEventMessage: getSystemSettings.airdropEventMessage ?? "",
        telegram: getSystemSettings.telegram ?? "",
        whatsApp: getSystemSettings.whatsApp ?? "",
        facebookUrl: getSystemSettings.facebookUrl ?? "",
        youtubeUrl: getSystemSettings.youtubeUrl ?? "",
        linkedinUrl: getSystemSettings.linkedinUrl ?? "",
        instagramUrl: getSystemSettings.instagramUrl ?? "",
        kycBonusToin: getSystemSettings.kycBonusToin ?? undefined,
        socialBonusToin: getSystemSettings.socialBonusToin ?? undefined,
        entryBonusToin: getSystemSettings.entryBonusToin ?? undefined,
        minUSDTWithdrawalAmount:
          getSystemSettings.minUSDTWithdrawalAmount ?? undefined,
        platformWithdrawalFeePercentage:
          getSystemSettings.platformWithdrawalFeePercentage ?? undefined,
        // favicon: getSystemSettings.favicon ?? "",
        // logo: getSystemSettings.logo ?? "",
      });
    }
  }, [getSystemSettings, form]);

  const onSubmit = async (data: TGeneralSettingsFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });

    try {
      const formData = new FormData();

      const fileFields = ["favicon", "logo"];

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        if (fileFields.includes(key)) {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await updateGeneralSetting({ body: formData }).unwrap();
      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: "Your changes have been saved.",
      });

      form.reset();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update general settings.",
      });
    }
  };

  return (
    <GeneralSettingsForm
      form={form}
      onSubmit={onSubmit}
      systemSettingData={getSystemSettings}
      isLoading={isLoading}
    />
  );
}
