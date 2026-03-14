"use client";

import FileUploader from "@/components/feature/file-uploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { TGeneralSettingsFormData } from "./generalSettingsSchema";
import { TGeneralSetting } from "@/store/api/system-settings/system-settings.types";
import { TNullish } from "@/store/api/common-api-types";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

interface Props {
  form: UseFormReturn<TGeneralSettingsFormData>;
  onSubmit: (data: TGeneralSettingsFormData) => void;
  systemSettingData: TGeneralSetting | TNullish;
  isLoading: boolean;
}

export function GeneralSettingsForm({
  form,
  onSubmit,
  systemSettingData,
  isLoading,
}: Props) {
  const [faviconFile, setFaviconFile] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File[]>([]);
  const { register } = form;
  return (
    <form
      className="space-y-6 text-default-100 grid grid-cols-2 gap-x-10"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FileUploader
        className="w-full"
        label="Favicon"
        defaultImage={systemSettingData?.faviconMedia?.url}
        files={faviconFile}
        setFiles={(files) => {
          setFaviconFile(files);
          form.setValue("favicon", files?.[0] ?? undefined);
        }}
        onRemoveDefaultImage={() => {
          form.setValue("favicon", null);
        }}
        isMultiple={false}
        allowedTypes={["image/x-icon", "image/png", "image/svg+xml"]}
        fileUploadLabelText="PNG, ICO, SVG (max 10MB)"
      />
      <FileUploader
        className="w-full"
        label="Logo"
        defaultImage={systemSettingData?.logoMedia?.url}
        files={logoFile}
        setFiles={(files) => {
          setLogoFile(files);
          form.setValue("logo", files?.[0] ?? undefined);
        }}
        isMultiple={false}
        allowedTypes={["image/png", "image/svg+xml", "image/jpeg"]}
        fileUploadLabelText="PNG, JPG, SVG (max 10MB)"
      />
      <div className="col-span-full">
        <Input
          {...register("siteTitle")}
          placeholder="Your Site Title"
          label="Site Title"
          className="!h-12"
          error={form.formState.errors.siteTitle?.message}
        />
      </div>

      <div className="col-span-full">
        <Input
          {...register("organizationEmail")}
          placeholder="example@email.com"
          label="Email"
          className="!h-12"
          error={form.formState.errors.organizationEmail?.message}
        />
      </div>

      <Input
        type="number"
        {...register("kycBonusToin", { valueAsNumber: true })}
        placeholder="50"
        label="KYC Bonus Toin"
        className="!h-12"
        error={form.formState.errors.kycBonusToin?.message}
      />
      <Input
        type="number"
        {...register("socialBonusToin", { valueAsNumber: true })}
        placeholder="25"
        label="Social Bonus Toin"
        className="!h-12"
        error={form.formState.errors.socialBonusToin?.message}
      />
      <div className="col-span-full">
        <Input
          type="number"
          {...register("entryBonusToin", { valueAsNumber: true })}
          placeholder="100"
          label="Entry Bonus Toin"
          className="!h-12"
          error={form.formState.errors.entryBonusToin?.message}
        />
      </div>

      <Input
        type="number"
        {...register("minUSDTWithdrawalAmount", { valueAsNumber: true })}
        placeholder="10"
        label="Min USDT Withdrawal Amount"
        className="!h-12"
        error={form.formState.errors.minUSDTWithdrawalAmount?.message}
      />

      <Input
        type="number"
        {...register("platformWithdrawalFeePercentage", {
          valueAsNumber: true,
        })}
        placeholder="1"
        label="Platform Withdrawal Fee Percentage"
        className="!h-12"
        error={form.formState.errors.platformWithdrawalFeePercentage?.message}
      />

      <Input
        {...register("whatsApp")}
        placeholder="+8801XXXXXXXXX"
        label="WhatsApp"
        className="!h-12"
        error={form.formState.errors.whatsApp?.message}
      />

      <Input
        {...register("telegram")}
        placeholder="@telegramUsername"
        label="Telegram"
        className="!h-12"
        error={form.formState.errors.telegram?.message}
      />

      <Input
        {...register("facebookUrl")}
        placeholder="https://facebook.com/toinpark"
        label="Facebook"
        className="!h-12"
        error={form.formState.errors.facebookUrl?.message}
      />
      <Input
        {...register("youtubeUrl")}
        placeholder="https://youtube.com/@toinpark"
        label="Youtube"
        className="!h-12"
        error={form.formState.errors.youtubeUrl?.message}
      />
      <Input
        {...register("linkedinUrl")}
        placeholder="https://linkedin.com/company/toinpark"
        label="Linkedin"
        className="!h-12"
        error={form.formState.errors.linkedinUrl?.message}
      />
      <Input
        {...register("instagramUrl")}
        placeholder="https://instagram.com/toinpark"
        label="Instagram"
        className="!h-12"
        error={form.formState.errors.instagramUrl?.message}
      />

      <div className="col-span-full">
        <Textarea
          {...register("airdropEventMessage")}
          label="Airdrop Event Message"
          placeholder="Your airdrop event message"
          error={form.formState.errors.airdropEventMessage?.message}
        />
      </div>

      <div className="flex justify-center mt-4 col-span-full">
        <SubmitButton
          isLoading={isLoading}
          className="text-default-900 w-full px-6 py-2 !h-12"
        >
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
