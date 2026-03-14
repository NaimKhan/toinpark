import { TResetPasswordSchema } from "./resetPasswordSchema";
import { useResetPasswordMutation } from "@/store/api/auth/auth-api";
import { useForm } from "react-hook-form";
import { initialFormValues } from "./initialFormValues";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TOtpParams } from "../otp/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "./resetPasswordSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "@/components/navigation";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import Cookies from "js-cookie";

export const useResetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { getAParamValue } = useManageSearchParams<TOtpParams>();
  const otpUniqueKey = getAParamValue("otpUniqueKey");
  const formProps = useForm<TResetPasswordSchema>({
    defaultValues: initialFormValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    if (!otpUniqueKey) {
      return;
    }
    const toastId = toast({
      title: "Resetting password...",
      description: "Please wait while we reset your password...",
      variant: "loading",
    });
    try {
      await resetPassword({
        otp: data?.otp,
        otpUniqueKey,
        newPassword: data?.newPassword,
        passwordConfirmation: data?.passwordConfirmation,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "default",
        title: "Success",
        description: "Your password has been reset successfully",
      });
      Cookies.remove("authinfo-Admin");
      Cookies.remove("authinfo-SuperAdmin");
      Cookies.remove("authinfo-Member");
      router.replace("/");
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, formProps.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error),
        description: "Something went wrong",
      });
    }
  };

  return {
    formProps,
    onSubmit,
    isLoading,
  };
};
