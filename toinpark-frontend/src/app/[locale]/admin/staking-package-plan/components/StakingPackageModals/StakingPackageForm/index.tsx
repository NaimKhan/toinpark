"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TAddStakingPackageFormData } from "./StakingPackageSchema";
interface AirdropEventFormProps {
  form: UseFormReturn<TAddStakingPackageFormData>;
  onSubmit: (data: TAddStakingPackageFormData) => void;
}

export default function StakingPackageForm({
  form,
  onSubmit,
}: AirdropEventFormProps) {
  const { register, handleSubmit, formState } = form;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        required
        placeholder="Package Name"
        label="Package Name"
        id="name"
        className="!h-12"
        {...register("name")}
        error={formState.errors.name?.message}
      />
      <Input
        type="number"
        required
        placeholder="Daily Profit (%)"
        label="Daily Profit (%)"
        id="dailyProfitPercent"
        className="!h-12"
        {...register("dailyProfitPercent", { valueAsNumber: true })}
        error={formState.errors.dailyProfitPercent?.message}
      />

      <Input
        type="number"
        placeholder="Bonus Amount"
        label="Bonus Amount"
        id="bonusAmount"
        step="0.01"
        className="!h-12"
        {...register("bonusAmount", { valueAsNumber: true })}
        error={formState.errors.bonusAmount?.message}
      />
      <Input
        type="number"
        required
        placeholder="Min Toin Amount"
        label="Min Toin Amount"
        id="minToinAmount"
        step="0.01"
        className="!h-12"
        {...register("minToinAmount", { valueAsNumber: true })}
        error={formState.errors.minToinAmount?.message}
      />
      <Input
        type="number"
        required
        placeholder="Max Toin Amount"
        label="Max Toin Amount"
        id="maxToinAmount"
        step="0.01"
        className="!h-12"
        {...register("maxToinAmount", { valueAsNumber: true })}
        error={formState.errors.maxToinAmount?.message}
      />
      <Input
        type="number"
        required
        placeholder="Minimum Maturity Period (Days)"
        label="Minimum Maturity Period (Days)"
        id="minimumDurationInDays"
        step="1"
        className="!h-12"
        {...register("minimumDurationInDays", { valueAsNumber: true })}
        error={formState.errors.minimumDurationInDays?.message}
      />
      <Input
        type="number"
        required
        placeholder="Recurring Profit (Days)"
        label="Recurring Profit (Days)"
        id="recurringProfitDays"
        step="1"
        className="!h-12"
        {...register("recurringProfitDays", { valueAsNumber: true })}
        error={formState.errors.recurringProfitDays?.message}
      />

      <Textarea
        placeholder="Description"
        label="Description"
        className="!h-24 w-full"
        {...register("description")}
        error={formState.errors.description?.message}
      />
    </form>
  );
}
