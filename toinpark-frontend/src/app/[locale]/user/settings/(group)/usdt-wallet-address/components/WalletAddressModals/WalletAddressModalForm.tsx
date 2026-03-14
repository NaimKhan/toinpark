"use client";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TAddWalletAddressFormData } from "./walletAddressSchema";

interface WalletAddressModalFormProps {
  form: UseFormReturn<TAddWalletAddressFormData>;
  onSubmit: (data: TAddWalletAddressFormData) => void;
}

export default function WalletAddressModalForm({
  form,
  onSubmit,
}: WalletAddressModalFormProps) {
  const { register, formState, handleSubmit } = form;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        required
        placeholder="Label (e.g. Main Wallet)"
        label="Label"
        id="label"
        className="!h-12"
        {...register("name")}
        error={formState.errors.name?.message}
      />
      <Input
        type="text"
        required
        placeholder="Wallet Address"
        label="Wallet Address"
        id="walletAccountId"
        className="!h-12"
        {...register("walletAccountId")}
        error={formState.errors.walletAccountId?.message}
      />
    </form>
  );
}
