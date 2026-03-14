"use client";
import FileUploader from "@/components/feature/file-uploader";
import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { TAddUSDTWalletAddressFormData } from "./USDTWalletaddressModalSchema";

interface IUSDTWalletAddressModalForm {
  form: UseFormReturn<TAddUSDTWalletAddressFormData>;
  onSubmit: (data: TAddUSDTWalletAddressFormData) => void;
}

function USDTWalletAddressModalForm({
  form,
  onSubmit,
}: IUSDTWalletAddressModalForm) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
      <Input
        type="text"
        placeholder="Name"
        label="Name"
        className="!h-12"
        labelClassName="text-base"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        type="text"
        placeholder="Wallet Address"
        label="Wallet Address"
        className="!h-12"
        labelClassName="text-base"
        {...register("walletAddress")}
        error={errors.walletAddress?.message}
      />

      <LabelErrorWrapper label="QR Image">
        <FileUploader
          files={imgFiles}
          setFiles={setImgFiles}
          isMultiple={false}
        />
      </LabelErrorWrapper>
    </form>
  );
}

export default USDTWalletAddressModalForm;
