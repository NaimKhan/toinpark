"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CheckboxIcon from "@/components/svg/CheckboxIcon";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

import {
  stakingPackageFormSchema,
  TStakingPackageForm,
} from "./stakingPackageForm.schema";

import { useBuyAStakingPackageMutation } from "@/store/api/staking-package/staking-package-api";
import { TGetAStakingPackage } from "@/store/api/staking-package/staking-package.type";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { useToast } from "@/components/ui/use-toast";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { showApiToast } from "@/lib/toast/api-toast";

const paymentMethods = [{ value: "nowpayment", label: "Nowpayment" }];

const parseNum = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) ? undefined : n;
};

export default function StakingPackageCard({
  pkg,
}: {
  pkg: TGetAStakingPackage;
}) {
  const { toast } = useToast();

  const { data: getSystemSettingRes } = useGetSystemSettingsQuery();
  const toinConventionRate = getSystemSettingRes?.data?.toinConventionRate;

  const [buyStackingPackage, { isLoading }] = useBuyAStakingPackageMutation();

  const form = useForm<TStakingPackageForm>({
    resolver: zodResolver(stakingPackageFormSchema),
    defaultValues: {
      toinAmount: undefined,
      USDAmount: undefined,
      paymentMethod: "",
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const onSubmit = async (values: TStakingPackageForm) => {
    const payload = { ...values, stakingPackageId: pkg.id };

    try {
      const response = await buyStackingPackage(payload).unwrap();
      showApiToast({
        response,
        title: "Staking Successful",
        description: `You have successfully staked in ${pkg.name} package.`,
        errorDescription:
          response?.message +
          ` For ${pkg?.name} Toin Should be ${pkg?.minToinAmount} - ${pkg.maxToinAmount}`,
      });

      if (response?.data?.invoice_url) {
        window.open(response.data.invoice_url, "_blank");
      }
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, setError);
      const firstFieldError = Object.values(fieldErrors)[0];
      toast({
        title: "Failed to Stake",
        description: firstFieldError || getApiMessage(error),
        variant: "error",
      });
    }
  };

  const handleToinsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNum(e.target.value);
    if (parsed === undefined) return;

    const value: number = parsed;

    const min = pkg.minToinAmount ?? 0;
    const max = pkg.maxToinAmount ?? 0;

    if (value < min || value > max) {
      const message = `For ${pkg.name} package, TOIN amount should be between ${min} and ${max}.`;
      toast({
        title: "Invalid Amount",
        description: message,
        variant: "error",
      });

      setError("toinAmount", {
        type: "manual",
        message: message,
      });
    } else {
      clearErrors("toinAmount");
    }

    setValue("toinAmount", value);

    if (toinConventionRate) {
      setValue("USDAmount", Number((value * toinConventionRate).toFixed(4)));
    }
  };

  const handleToinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseNum(e.target.value);
    if (v !== undefined && toinConventionRate) {
      setValue("USDAmount", Number((v * toinConventionRate).toFixed(4)));
    }
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseNum(e.target.value);
    if (v !== undefined && toinConventionRate) {
      setValue("toinAmount", Number((v / toinConventionRate).toFixed(4)));
    }
  };
  const handleUsdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseNum(e.target.value);
    if (v === undefined || !toinConventionRate) return;

    const minUsd = (pkg.minToinAmount ?? 0) * toinConventionRate;
    const maxUsd = (pkg.maxToinAmount ?? 0) * toinConventionRate;

    const usdValue = v;

    if (usdValue < minUsd || usdValue > maxUsd) {
      const message = `For ${pkg.name} package, USD amount should be between ${minUsd.toFixed(
        2,
      )} and ${maxUsd.toFixed(2)}.`;
      toast({
        title: "Invalid Amount",
        description: message,
        variant: "error",
      });

      setError("USDAmount", {
        type: "manual",
        message: message,
      });
    } else {
      clearErrors("USDAmount");
    }

    setValue("USDAmount", Number(usdValue.toFixed(4)));

    const toinValue = usdValue / toinConventionRate;
    setValue("toinAmount", Number(toinValue.toFixed(4)));
  };

  return (
    <Card className="bg-background border p-6 md:p-8 text-default-100 rounded-xl">
      <CardHeader className="flex flex-col items-start gap-4 p-0">
        <div className="flex justify-between items-center w-full">
          <CardTitle
            className={cn(
              "text-3xl md:text-4xl font-medium",
              pkg.name === "Gold"
                ? "text-gold"
                : pkg.name === "Diamond"
                  ? "text-diamond"
                  : "text-default-100",
            )}
          >
            {pkg.name}
          </CardTitle>

          {(pkg.bonusAmount ?? 0) > 0 && (
            <span className="text-sm font-semibold text-center text-primary bg-primary/10 px-3 py-2 rounded-full">
              +{pkg.bonusAmount} Bonus TOIN
            </span>
          )}
        </div>

        <CardDescription className="text-default-200 text-lg flex items-center gap-2">
          <Image src="/images/all/koin.png" width={24} height={24} alt="coin" />
          {pkg.minToinAmount} TOIN to {pkg.maxToinAmount} TOIN
        </CardDescription>
      </CardHeader>

      <Separator className="border-default-800" />

      <CardContent className="space-y-6 p-0">
        <div className="space-y-2">
          <div className="text-base font-medium flex items-center gap-2">
            <CheckboxIcon className="h-6 w-6 text-primary" />
            Daily Profit: {pkg.dailyProfitPercent}%
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CheckboxIcon className="h-6 w-6 text-primary" />
            {pkg.minimumDurationInDays} Days
          </div>
        </div>

        {/* TOINS & USD Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CommonTooltip content="Toins">
            <Input
              type="number"
              min={pkg.minToinAmount ?? 0}
              max={pkg.maxToinAmount ?? undefined}
              className="text-default-100"
              placeholder="Toins"
              {...register("toinAmount", { valueAsNumber: true })}
              onBlur={handleToinsValue}
              onChange={handleToinsChange}
              error={errors?.toinAmount?.message}
            />
          </CommonTooltip>

          <CommonTooltip content="USD">
            <Input
              type="number"
              className="text-default-100"
              placeholder="USD"
              {...register("USDAmount", { valueAsNumber: true })}
              onBlur={handleUsdValue}
              onChange={handleUsdChange}
              error={errors?.USDAmount?.message}
              readOnly
            />
          </CommonTooltip>
        </div>

        {/* PAYMENT METHOD */}
        <LabelErrorWrapper error={errors?.paymentMethod?.message}>
          <Select onValueChange={(value) => setValue("paymentMethod", value)}>
            <SelectTrigger
              error={errors?.paymentMethod?.message}
              className={cn("bg-input border text-default-100 w-full")}
            >
              <SelectValue placeholder="Select Pay Mode" />
            </SelectTrigger>

            <SelectContent>
              {paymentMethods.map((pm) => (
                <SelectItem key={pm.value} value={pm.value}>
                  {pm.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </LabelErrorWrapper>

        {/* Submit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubmitButton
            isLoading={isLoading}
            className="w-full text-lg font-medium"
          >
            Stake
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
