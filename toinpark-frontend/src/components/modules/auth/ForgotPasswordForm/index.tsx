"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/ui/phoneInput";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { EUserSignUpType } from "@/store/api/auth/auth.types";

import {
  forgotPasswordSchema,
  TForgotPasswordSchema,
} from "./forgotPasswordSchema";
import { useForgotPasswordMutation } from "@/store/api/auth/auth-api";
import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { useRouter } from "@/components/navigation";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const local = useDefaultLocale();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
    defaultValues: {
      type: EUserSignUpType.EMAIL,
      email: "",
      phone: "",
    },
  });

  const type = watch("type") as EUserSignUpType;

  const onSubmit = async (data: TForgotPasswordSchema) => {
    const toastId = toast({
      variant: "loading",
      title: "Sending OTP",
      description: "Please wait...",
    });
    try {
      const response = await forgotPassword({
        identifier:
          (type === EUserSignUpType.EMAIL ? data.email : data.phone) || "",
      }).unwrap();

      const otpUnique = response?.data?.otpUniqueKey;
      const queryData = {
        otpUniqueKey: otpUnique,
      };

      const { queryString } = generateQueryString(queryData, {
        stringifyToPreserveTypes: true,
      });
      router.replace(`/auth/reset-password${queryString}`);

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "OTP Sent",
        description:
          type === EUserSignUpType.EMAIL
            ? "Check your email for the OTP."
            : "Check your phone for the OTP.",
      });

      reset({ type });
    } catch (error) {
      console.info("Forgot password error:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error),
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Tabs
          value={type === EUserSignUpType.EMAIL ? "email" : "phone"}
          onValueChange={(v) => {
            const newType =
              v === "email" ? EUserSignUpType.EMAIL : EUserSignUpType.PHONE;
            setValue("type", newType);

            // Clear and validate the relevant field
            if (newType === EUserSignUpType.EMAIL) {
              // setValue("phone", "", { shouldValidate: false });
              trigger("email");
            } else {
              // setValue("email", "", { shouldValidate: false });
              trigger("phone");
            }
          }}
          className="gap-0"
        >
          <TabsList className="grid grid-cols-2 gap-5 bg-transparent px-0">
            <TabsTrigger
              value="email"
              className="relative rounded-none border-0 cursor-pointer w-fit text-xl text-default-200 px-0 data-[state=active]:text-default-100  data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-none"
            >
              Email
            </TabsTrigger>
            <TabsTrigger
              value="phone"
              className="relative rounded-none border-0 cursor-pointer text-xl text-default-200 px-0 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-none"
            >
              Phone
            </TabsTrigger>
          </TabsList>

          {/* Email Field */}
          <TabsContent value="email" className="mt-4">
            <Input
              {...register("email")}
              placeholder="Enter your email address"
              error={errors.email?.message}
            />
          </TabsContent>

          {/* Phone Field */}
          <TabsContent value="phone" className="mt-4">
            <PhoneInputComponent
              inputClassName="bg-input"
              initialCountry="bd"
              value={watch("phone")}
              onChange={(phone: string) => setValue("phone", phone)}
              error={errors.phone?.message}
            />
          </TabsContent>
        </Tabs>

        <SubmitButton
          className="w-full font-medium"
          isLoading={isLoading}
          loadingContent="Sending OTP..."
        >
          Send OTP
        </SubmitButton>

        <p className="text-lg text-center text-default-200 mt-2">
          {"Don’t have an account? "}
          <Link
            href={`/${local}/auth/register`}
            className="text-default-100 hover:text-default-100/80 duration-200 underline"
          >
            Create new account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
