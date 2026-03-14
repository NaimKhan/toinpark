import { useToast } from "@/components/ui/use-toast";
import { useUserSignUpMutation } from "@/store/api/auth/auth-api";
import { useForm, useWatch } from "react-hook-form";
import { registerSchema, TRegisterSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/components/navigation";
import { initialRegisterFormValues } from "./initialRegisterFormValues";
import { EUserSignUpType, TUserSignUpArgs } from "@/store/api/auth/auth.types";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import useManageSearchParams from "@/hooks/useManageSearchParams";

export const useRegisterForm = () => {
  const { getAParamValue } = useManageSearchParams<{ referral?: string }>();
  const referralCode = getAParamValue("referral");
  const { toast } = useToast();
  const [userSignUp, { isLoading: isUserSignUpLoading }] =
    useUserSignUpMutation();
  const router = useRouter();
  const formProps = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: initialRegisterFormValues,
  });

  const type = useWatch({
    control: formProps.control,
    name: "type",
  });

  const onSubmit = async (data: TRegisterSchema) => {
    const toastId = toast({
      title: "Creating account...",
      description: "Please wait while we create your account...",
      variant: "loading",
    });
    try {
      const formData: TUserSignUpArgs = {
        identifierType: type as EUserSignUpType,
        identifier:
          (type === EUserSignUpType.EMAIL ? data.email : data.phone) || "",
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        firstName: data.firstName,
        lastName: data.lastName,
        referralCode: referralCode || "",
      };
      const response = await userSignUp(formData).unwrap();
      const otpUnique = response?.data?.otpUniqueKey;
      const queryData = {
        otpUniqueKey: otpUnique,
      };

      const { queryString } = generateQueryString(queryData, {
        stringifyToPreserveTypes: true,
      });
      router.replace(`/auth/otp-verification${queryString}`);
      toastId.update({
        id: toastId.id,
        title: "Account created successfully",
        description: "Please check your email for verification",
        variant: "success",
      });
      formProps.reset({ type });
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, formProps.setError);
      toastId.dismiss();
    }
  };
  return {
    formProps,
    onSubmit,
    isUserSignUpLoading,
    type,
  };
};
