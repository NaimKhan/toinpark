import { Controller, UseFormReturn } from "react-hook-form";
import { TAddReferralMilestoneFormData } from "./addReferralMilestoneModalSchema";
import { useGetReferralMilestonesQuery } from "@/store/api/referral-milestone/referral-milestone-api";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TReferralMilestone } from "@/store/api/referral-milestone/referral-milestone.type";
import { TNullish } from "@/store/api/common-api-types";

interface ReferralMilestoneModalFormProps {
  form: UseFormReturn<TAddReferralMilestoneFormData>;
  onSubmit: (data: TAddReferralMilestoneFormData) => void;
  referralMilestoneData?: TReferralMilestone | TNullish;
}

export default function ReferralMilestoneModalForm({
  form,
  onSubmit,
}: ReferralMilestoneModalFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useGetReferralMilestonesQuery({ limit: 300 });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
      <Input
        type="text"
        placeholder="Referral Name"
        label="Referral Name"
        className="!h-12"
        labelClassName="text-base"
        {...register("referralName")}
        error={errors.referralName?.message}
        required
      />

      <Input
        type="number"
        placeholder="Toin Amount"
        label="Toin Amount"
        className="!h-12"
        labelClassName="text-base"
        {...register("toinAmount", { valueAsNumber: true })}
        error={errors.toinAmount?.message}
        required
      />

      <Input
        type="number"
        placeholder="Target Person"
        label="Target Person"
        className="!h-12"
        labelClassName="text-base"
        {...register("targetPerson", { valueAsNumber: true })}
        error={errors.targetPerson?.message}
        required
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-3 mt-2">
            <label className="text-sm font-medium">
              Status: {field.value ? "Active" : "Inactive"}
            </label>

            <Switch
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            />
          </div>
        )}
      />
    </form>
  );
}
