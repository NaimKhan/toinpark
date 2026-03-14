"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { TString } from "@/store/api/common-api-types";
import {
  addSubAdminSchema,
  editSubAdminSchema,
  TSubAdminFormSchema,
} from "./subAdminSchema";
import { TCreateSubAdmin } from "@/store/api/sub-admin-management/sub-admin-management.types";
import {
  useCreateASubAdminMutation,
  useGetASubAdminQuery,
  useUpdateASubAdminMutation,
} from "@/store/api/sub-admin-management/sub-admin-management-api";
import { initialFormValues } from "./initialFormValues";
import { useRouter } from "next/navigation";
import { showApiToast } from "@/lib/toast/api-toast";
import useDefaultLocale from "@/hooks/useDefaultLocale";

type UseSubAdminFormProps = {
  subAdminId?: TString;
};

export function useSubAdminForm({ subAdminId }: UseSubAdminFormProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = !!subAdminId;
  const local = useDefaultLocale();

  const { data: getASubAdminRes, isFetching: isFetchingStakingPackage } =
    useGetASubAdminQuery({ id: subAdminId! }, { skip: !subAdminId || !open });

  const getASubAdminData = getASubAdminRes?.data;

  const [createSubAdmin, { isLoading: isCreating }] =
    useCreateASubAdminMutation();

  const [updateSubAdmin, { isLoading: isUpdating }] =
    useUpdateASubAdminMutation();

  const form = useForm<TSubAdminFormSchema>({
    resolver: zodResolver(isEditMode ? editSubAdminSchema : addSubAdminSchema),
    defaultValues: initialFormValues,
  });

  const { reset, register, control } = form;

  useEffect(() => {
    if (subAdminId && getASubAdminData) {
      reset({
        firstName: getASubAdminData?.userProfile?.firstName ?? "",
        lastName: getASubAdminData?.userProfile?.lastName ?? "",
        email: getASubAdminData?.email ?? "",
        userName: getASubAdminData?.userName ?? "",
      });
    }
  }, [subAdminId, getASubAdminData, reset]);

  const onSubmit = async (data: TSubAdminFormSchema) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      // Create a copy so we can modify it safely
      const formData: TCreateSubAdmin = { ...data };

      // Remove password fields if they are empty or undefined
      if (!formData.password) delete formData.password;
      if (!formData.passwordConfirmation) delete formData.passwordConfirmation;

      if (subAdminId) {
        // UPDATE
        const response = await updateSubAdmin({
          id: subAdminId,
          body: formData,
        }).unwrap();

        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Your changes have been saved.",
        });
      } else {
        const response = await createSubAdmin(formData).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "The sub admin has been added successfully.",
        });
      }

      const redirectUrl = `/${local}/admin/settings/sub-admin-management`;
      reset();
      router.push(redirectUrl);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update sub admin.",
      });
    }
  };

  return {
    form,
    register,
    control,
    onSubmit,
    isFetchingStakingPackage,
    getASubAdminData,
    isEditMode: !!subAdminId,
    isLoading: isCreating || isUpdating,
  };
}
