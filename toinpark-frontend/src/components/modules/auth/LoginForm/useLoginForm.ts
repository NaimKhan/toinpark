import { useToast } from "@/components/ui/use-toast";
import { loginSchema, TLoginSchema } from "./loginSchema";
import { useLoginUserMutation } from "@/store/api/auth/auth-api";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EUserSignUpType, TSigninArgs } from "@/store/api/auth/auth.types";
import { initialLoginFormValues } from "./initialFormValues";
import { useRouter } from "@/components/navigation";

import {
  getApiMessage,
  getFieldErrors,
  isApiErrorResponse,
} from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { getRoleBasedRedirectRoute } from "@/lib/auth-utils/route-owner";

export const useLoginForm = () => {
  const router = useRouter();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const { toast } = useToast();

  const formProps = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: initialLoginFormValues,
  });

  const type = useWatch({
    control: formProps.control,
    name: "type",
  }) as EUserSignUpType;

  const onSubmit = async (data: TLoginSchema) => {
    const toastId = toast({
      title: "Logging in...",
      description: "Please wait while we log you in...",
      variant: "loading",
    });
    try {
      const formData: TSigninArgs = {
        identifier:
          (type === EUserSignUpType.EMAIL ? data.email : data.phone) || "",
        password: data.password,
      };
      const loginRes = await loginUser(formData).unwrap();

      toastId.update({
        id: toastId.id,
        title: "Login successful",
        description: "Welcome back!",
        variant: "success",
      });
      const rawRole = loginRes?.data?.user?.role;
      const redirectUrl = getRoleBasedRedirectRoute(rawRole);
      router.push(redirectUrl);
      formProps.reset();
    } catch (error) {
      if (
        isApiErrorResponse(error) &&
        error?.data?.statusCode === 403 &&
        error?.data?.data?.isVerified === false
      ) {
        const otpUniqueKey = error?.data?.data?.otpUniqueKey;

        const queryData = {
          otpUniqueKey,
        };

        const { queryString } = generateQueryString(queryData, {
          stringifyToPreserveTypes: true,
        });
        router.replace(`/auth/otp-verification${queryString}`);
        toastId.dismiss();
        return;
      }
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, formProps.setError);

      toastId.update({
        id: toastId.id,
        title: getApiMessage(error) || "Login failed",
        description: "Please try again",
        variant: "error",
      });
    }
  };
  return {
    formProps,
    watchValues: { type },
    onSubmit,
    isLoginLoading,
  };
};
