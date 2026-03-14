import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDefaultLocale from "@/hooks/useDefaultLocale";

import {
  userProfileSchema,
  type TUserProfileSchema,
} from "./userProfileSchema";
import { getInitialProfileValues } from "./initialFormValues";
import {
  TUpdateProfile,
  TUpdateUserProfileArgs,
  TUserProfile,
} from "@/store/api/user-profile/user-profile.types";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUserProfileMutation } from "@/store/api/user-profile/user-profile-api";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";

export function useProfileEditForm(user: TUserProfile | null | undefined) {
  const { toast } = useToast();
  const router = useRouter();
  const local = useDefaultLocale();

  const form = useForm<TUserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: getInitialProfileValues(user || ({} as TUserProfile)),
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      const currentValues = form.getValues();
      const newInitialValues = getInitialProfileValues(user);

      form.reset({
        ...newInitialValues,
        emailDirty: currentValues.emailDirty,
        phoneDirty: currentValues.phoneDirty,
        openVerify: currentValues.openVerify,
        verifyValue: currentValues.verifyValue,
        verifyType: currentValues.verifyType,
        openStepTwo: currentValues.openStepTwo,
        flow: currentValues.flow,
        firstVerificationRes: currentValues.firstVerificationRes,
        stage: currentValues.stage,
        newInfo: currentValues.newInfo,
        otpUniqueKey: currentValues.otpUniqueKey,
        otpError: currentValues.otpError,
      });
    }
  }, [user, form]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const onSubmit = async (data: TUserProfileSchema) => {
    try {
      const {
        country,
        state,
        email,
        phoneNumber,
        status,
        emailDirty,
        phoneDirty,
        openVerify,
        verifyValue,
        verifyType,
        openStepTwo,
        flow,
        firstVerificationRes,
        stage,
        newInfo,
        otpUniqueKey,
        otpError,
        ...rest
      } = data;

      const payload: TUpdateProfile = {
        ...rest,
        countryId: country,
        stateId: state,
      };

      const response = await updateUserProfile({
        id: user?.id,
        body: payload,
      } as TUpdateUserProfileArgs).unwrap();

      if (response?.success) {
        showApiToast({ response, title: "Profile Updated successfully" });
        router.replace(`/${local}/user/profile`);
      }
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toast({
        title: "Profile update failed",
        variant: "error",
        description: getApiMessage(error),
      });
    }
  };

  return { form, onSubmit, isLoading };
}
