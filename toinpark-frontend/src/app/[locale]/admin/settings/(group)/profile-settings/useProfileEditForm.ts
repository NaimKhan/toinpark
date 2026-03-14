import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getInitialProfileValues } from "./initialFormValues";
import {
  TUpdateUserProfileArgs,
  TUserProfile,
} from "@/store/api/user-profile/user-profile.types";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUserProfileMutation } from "@/store/api/user-profile/user-profile-api";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { TUserProfileSchema, userProfileSchema } from "./userProfileSchema";
import { showApiToast } from "@/lib/toast/api-toast";

export function useProfileEditForm(user: TUserProfile | null | undefined) {
  const { toast } = useToast();

  const form = useForm<TUserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: getInitialProfileValues(user || ({} as TUserProfile)),
    mode: "onBlur",
  });

  // Reset form when user changes
  useEffect(() => {
    if (user) {
      form.reset(getInitialProfileValues(user));
    }
  }, [user, form]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const onSubmit = async (data: TUserProfileSchema) => {
    try {
      const response = await updateUserProfile({
        id: user?.id,
        body: data,
      } as TUpdateUserProfileArgs).unwrap();
      showApiToast({ response, title: "Profile Updated Successfully" });
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toast({
        title: "Profile update failed",
        description: getApiMessage(error),
        variant: "error",
      });
    }
  };

  return { form, onSubmit, isLoading };
}
