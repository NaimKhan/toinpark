"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addStakingPackageModalSchema,
  TAddStakingPackageFormData,
} from "./StakingPackageSchema";

import {
  useCreateAStakingPackageMutation,
  useGetAStakingPackageQuery,
  useUpdateAStakingPackageMutation,
} from "@/store/api/staking-package/staking-package-api";

import { TCreateStakingPackage } from "@/store/api/staking-package/staking-package.type";

import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { TString } from "@/store/api/common-api-types";
import { showApiToast } from "@/lib/toast/api-toast";

type UseStakingPackageFormProps = {
  stakingPackageId?: TString;
};

export function useStakingPackageForm({
  stakingPackageId,
}: UseStakingPackageFormProps = {}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: getAStakingPackageRes, isFetching: isFetchingStakingPackage } =
    useGetAStakingPackageQuery(
      { id: stakingPackageId! },
      { skip: !stakingPackageId || !open },
    );

  const getAStakingPackageData = getAStakingPackageRes?.data;

  const [createStakingPackage, createState] =
    useCreateAStakingPackageMutation();
  const [updateStakingPackage, updateState] =
    useUpdateAStakingPackageMutation();

  const form = useForm<TAddStakingPackageFormData>({
    resolver: zodResolver(addStakingPackageModalSchema),
    defaultValues: {
      name: "",
      dailyProfitPercent: 0,
      bonusAmount: 0,
      maxToinAmount: 0,
      minimumDurationInDays: 0,
      recurringProfitDays: 0,
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (stakingPackageId && getAStakingPackageData) {
      reset({
        name: getAStakingPackageData?.name ?? "",
        dailyProfitPercent: getAStakingPackageData?.dailyProfitPercent ?? 0,
        bonusAmount: getAStakingPackageData?.bonusAmount ?? 0,
        maxToinAmount: getAStakingPackageData?.maxToinAmount ?? 0,
        minToinAmount: getAStakingPackageData?.minToinAmount ?? 0,
        minimumDurationInDays:
          getAStakingPackageData?.minimumDurationInDays ?? 0,
        recurringProfitDays: getAStakingPackageData?.recurringProfitDays ?? 0,
        description: getAStakingPackageData?.description ?? "",
      });
    }
  }, [stakingPackageId, getAStakingPackageData, reset]);

  const onSubmit = async (data: TAddStakingPackageFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const formData = data as TCreateStakingPackage;

      if (stakingPackageId) {
        const response = await updateStakingPackage({
          id: stakingPackageId,
          body: formData,
        }).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Staking Package Updated Successfully",
        });
      } else {
        const response = await createStakingPackage(formData).unwrap();
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Success",
          description: "Staking Package Created Successfully",
        });
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Staking Package Created Successfully",
        });
      }

      reset();
      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update staking package.",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit, () => {})();
  };

  return {
    form,
    open,
    setOpen,
    onSubmit,
    handleConfirm,
    isFetchingStakingPackage,
    getAStakingPackageData,
    isEditMode: !!stakingPackageId,
    isLoading: stakingPackageId ? updateState.isLoading : createState.isLoading,
  };
}
