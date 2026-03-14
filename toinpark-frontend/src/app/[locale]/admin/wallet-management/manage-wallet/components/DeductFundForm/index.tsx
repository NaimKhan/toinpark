"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import { useGetMembersQuery } from "@/store/api/members/members-api";
import {
  useDeductFundMutation,
  useGetUserStakingPackagesQuery,
} from "@/store/api/admin-staking/admin-staking-api";
import { deductFundFormSchema, TDeductFundForm } from "./deductFundFormSchema";
import { showApiToast } from "@/lib/toast/api-toast";
import { useRouter } from "next/navigation";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { toast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

const parseNum = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
};

export default function DeductFundForm() {
  const { data: systemSettingsRes } = useGetSystemSettingsQuery();
  const toinConventionRate = systemSettingsRes?.data?.toinConventionRate;

  const form = useForm<TDeductFundForm>({
    resolver: zodResolver(deductFundFormSchema),
    defaultValues: {
      userId: "",
      userName: "",
      toinAmount: 0,
      USDAmount: 0,
      remark: "",
      walletType: "capital",
      stakingPackageId: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = form;

  const [deductFund, { isLoading }] = useDeductFundMutation();
  const router = useRouter();
  const locale = useDefaultLocale();

  const userId = useWatch({ control, name: "userId" });
  const walletType = useWatch({ control, name: "walletType" });
  const stakingPackageId = useWatch({ control, name: "stakingPackageId" });

  // Fetch Member Details
  const { data: memberRes } = useGetMembersQuery(
    { search: userId },
    { skip: !userId || userId.length < 1 },
  );

  const matchedUser = memberRes?.data?.items?.find(
    (m) =>
      (m.username === userId.trim() || m.id?.toString() === userId.trim()) &&
      m.status === "ACTIVE",
  );

  // Fetch Staking Packages if user is found
  const { data: stakingPackagesRes } = useGetUserStakingPackagesQuery(
    matchedUser?.id,
    { skip: !matchedUser?.id },
  );

  useEffect(() => {
    if (matchedUser) {
      const firstName = matchedUser.userProfile?.firstName || "";
      const lastName = matchedUser.userProfile?.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim();
      setValue("userName", fullName || matchedUser.username || "");
    } else {
      setValue("userName", "");
    }
  }, [matchedUser, setValue]);

  const handleToinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseNum(e.target.value);
    if (v !== undefined && toinConventionRate) {
      setValue("toinAmount", v);
      setValue("USDAmount", Number((v * toinConventionRate).toFixed(4)));
    }
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseNum(e.target.value);
    if (v !== undefined && toinConventionRate) {
      setValue("USDAmount", v);
      setValue("toinAmount", Number((v / toinConventionRate).toFixed(4)));
    }
  };

  const onSubmit = async (data: TDeductFundForm) => {
    const toastId = toast({
      variant: "loading",
      title: `Loading...`,
      description: "Please wait while we apply your changes.",
    });
    if (!matchedUser?.id) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: "User not found or inactive",
      });
      return;
    }

    const payload = {
      userId: matchedUser.id,
      userStakingPackageId: data.stakingPackageId,
      toinAmount: data.toinAmount || 0,
      remark: data.remark || "",
    };

    try {
      const res = await deductFund(payload).unwrap();

      if (res) {
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Success",
          description: "Fund deducted successfully",
        });

        if (res.success) {
          reset();
          router.push(`/${locale}/admin/wallet-management/deduct-fund-history`);
        }
      }
    } catch (error: any) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to deduct fund",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 text-default-100"
    >
      <Input
        placeholder="Enter User ID"
        label="User ID"
        labelClassName="text-md"
        className="h-12 text-sm font-light"
        {...register("userId")}
        error={errors.userId?.message}
      />
      <Input
        placeholder="Full Name"
        label="Full Name"
        labelClassName="text-md"
        className="h-12 text-sm font-light"
        {...register("userName")}
        readOnly
      />

      <div className="flex flex-col gap-4">
        <label className="text-md font-medium">Staking Package</label>
        <Select
          value={stakingPackageId || undefined}
          disabled={
            !stakingPackagesRes?.data || stakingPackagesRes.data.length === 0
          }
          onValueChange={(val) => {
            setValue("stakingPackageId", val, { shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full gap-1 px-4 text-base text-default-100 !h-12 text-center">
            <SelectValue placeholder="Select Package" />
          </SelectTrigger>
          <SelectContent className="text-default-100">
            {stakingPackagesRes?.data?.map((pkg: any) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.stakingTransaction.transactionAutoId} -{" "}
                {pkg.package?.name || pkg.package?.id} (
                {pkg.stakingTransaction.toinAmount} TOIN -{" "}
                {pkg.stakingTransaction.usdtAmount} USDT)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.stakingPackageId && (
          <p className="text-red-500 text-sm">
            {errors.stakingPackageId.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          step="any"
          label="TOIN Amount"
          labelClassName="text-md"
          className="h-12 text-sm font-light"
          placeholder="Enter TOIN Amount"
          {...register("toinAmount", { valueAsNumber: true })}
          onChange={handleToinsChange}
          error={errors.toinAmount?.message}
        />
        <Input
          type="number"
          step="any"
          label="USDT Amount"
          labelClassName="text-md"
          className="h-12 text-sm font-light"
          placeholder="Enter USDT Amount"
          {...register("USDAmount", { valueAsNumber: true })}
          onChange={handleUsdChange}
          error={errors.USDAmount?.message}
          readOnly
        />
      </div>

      <Textarea
        placeholder="Enter Remark"
        label="Remark"
        labelClassName="text-md"
        className="h-28 text-sm font-light"
        {...register("remark")}
        error={errors.remark?.message}
      />

      <div className="space-y-4">
        {errors.walletType && (
          <p className="text-red-500 text-sm">{errors.walletType.message}</p>
        )}
      </div>

      <SubmitButton
        isLoading={isLoading}
        disabled={!matchedUser?.id || !stakingPackageId || isLoading}
        className="!h-12 text-md font-medium text-default-100 w-full"
      >
        Submit
      </SubmitButton>
    </form>
  );
}
