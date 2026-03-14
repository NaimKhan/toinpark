"use client";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type TChangePasswordForm,
} from "./changePasswordSchema";
import { useChangeUserPasswordMutation } from "@/store/api/user-profile/user-profile-api";
import { type TChangeUserPasswordArgs } from "@/store/api/user-profile/user-profile.types";
import { useRouter } from "next/navigation";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export const useChangePasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const local = useDefaultLocale();

  const formProps = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();

  const onSubmit = async (data: TChangePasswordForm) => {
    try {
      const formData = data as TChangeUserPasswordArgs;
      const changePasswordRes = await changePassword(formData).unwrap();

      if (changePasswordRes?.success) {
        toast({
          title: "Password updated successfully",
          description:
            "Your password has been changed and the new settings are now applied.",
          variant: "success",
        });

        router.replace(`/${local}/user/profile`);
        formProps.reset();
      }
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, formProps.setError);

      toast({
        title: "Password update failed",
        description: getApiMessage(error),
        variant: "error",
      });
    }
  };

  return {
    formProps,
    onSubmit,
    isLoading,
  };
};
