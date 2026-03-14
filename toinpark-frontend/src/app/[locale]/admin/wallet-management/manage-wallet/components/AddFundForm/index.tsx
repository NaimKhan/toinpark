"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import { useGetMembersQuery } from "@/store/api/members/members-api";
import { addFundFormSchema, TAddFundForm } from "./addFundFormSchema";
import { useAdminStakeMutation } from "@/store/api/admin-staking/admin-staking-api";
import { toast } from "@/components/ui/use-toast";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useRouter } from "next/navigation";
import useDefaultLocale from "@/hooks/useDefaultLocale";

const parseNum = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
};

export default function AddFundForm() {
  const { data: systemSettingsRes } = useGetSystemSettingsQuery();
  const toinConventionRate = systemSettingsRes?.data?.toinConventionRate;

  const form = useForm<TAddFundForm>({
    resolver: zodResolver(addFundFormSchema),
    defaultValues: {
      toinAccountNumber: "",
      userName: "",
      toinAmount: 0,
      USDAmount: 0,
      remark: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const toinAccountNumber = useWatch({
    control: form.control,
    name: "toinAccountNumber",
  });

  const { data: memberRes } = useGetMembersQuery(
    { search: toinAccountNumber },
    { skip: !toinAccountNumber || toinAccountNumber.length < 1 },
  );

  useEffect(() => {
    if (
      toinAccountNumber &&
      memberRes?.success &&
      memberRes.data?.items?.length
    ) {
      const trimmedId = toinAccountNumber.trim();
      const match = memberRes.data.items.find(
        (m) =>
          (m.username === trimmedId || m.id?.toString() === trimmedId) &&
          m.status === "ACTIVE",
      );

      if (match) {
        const firstName = match.userProfile?.firstName || "";
        const lastName = match.userProfile?.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim();
        setValue("userName", fullName || match.username || "");
      } else {
        setValue("userName", "");
      }
    } else {
      setValue("userName", "");
    }
  }, [memberRes, setValue, toinAccountNumber]);

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

  const userName = useWatch({
    control: form.control,
    name: "userName",
  });

  const [adminStake, { isLoading }] = useAdminStakeMutation();
  const router = useRouter();
  const locale = useDefaultLocale();

  const onSubmit = async (data: TAddFundForm) => {
    const trimmedId = data.toinAccountNumber.trim();
    const match = memberRes?.data?.items?.find(
      (m) =>
        (m.username === trimmedId || m.id?.toString() === trimmedId) &&
        m.status === "ACTIVE",
    );

    if (!match) {
      toast({
        variant: "error",
        title: "Error",
        description: "User not found or inactive",
      });
      return;
    }

    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add funds to the wallet.",
    });

    try {
      const payload = {
        userId: match.id,
        toinAmount: data.toinAmount,
        usdtAmount: data.USDAmount,
        remark: data.remark || "",
      };

      await adminStake(payload).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Funds added successfully",
      });

      form.reset();
      router.push(`/${locale}/admin/wallet-management/add-fund-history`);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add funds",
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
        {...register("toinAccountNumber")}
        error={errors?.toinAccountNumber?.message}
      />
      <Input
        placeholder="Full Name"
        label="Full Name"
        labelClassName="text-md"
        className="h-12 text-sm font-light"
        {...register("userName")}
        readOnly
      />

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
          error={errors?.toinAmount?.message}
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
          error={errors?.USDAmount?.message}
          readOnly
        />
      </div>

      <Textarea
        placeholder="Enter Remark"
        label="Remark"
        labelClassName="text-md"
        className="h-28 text-sm font-light"
        {...register("remark")}
        error={errors?.remark?.message}
      />

      <SubmitButton
        isLoading={isLoading}
        disabled={!userName || isLoading}
        className="!h-12 text-sm md:text-md font-light md:font-medium text-default-100 w-full"
      >
        Submit
      </SubmitButton>
    </form>
  );
}

