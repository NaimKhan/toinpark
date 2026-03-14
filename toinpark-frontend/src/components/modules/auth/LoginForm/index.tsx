"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordInput from "@/components/ui/PasswordInput";
import PhoneInputComponent from "@/components/ui/phoneInput";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { Label } from "@/components/ui/label";
import { EUserSignUpType } from "@/store/api/auth/auth.types";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import { useLoginForm } from "./useLoginForm";

function LoginForm() {
  const {
    formProps: {
      register,
      handleSubmit,
      setValue,
      watch,
      trigger,
      formState: { errors },
      clearErrors,
    },
    watchValues: { type },
    onSubmit,
    isLoginLoading,
  } = useLoginForm();
  const local = useDefaultLocale();

  return (
    <div className="w-full px-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Tabs */}
        <Tabs
          value={type === EUserSignUpType.EMAIL ? "email" : "phone"}
          onValueChange={(v) => {
            const newType =
              v === "email" ? EUserSignUpType.EMAIL : EUserSignUpType.PHONE;
            setValue("type", newType);

            // Clear and validate relevant field
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
              className="relative rounded-none border-0 cursor-pointer w-fit text-xl text-default-200 px-0 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-none"
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
              {...register("email", {
                onChange: (e) => {
                  // normal RHF onChange runs automatically
                  if (e.target.value.trim()) {
                    clearErrors("identifier");
                  }
                },
              })}
              placeholder="Enter your email address"
              error={errors.email?.message || errors?.identifier?.message}
            />
          </TabsContent>

          {/* Phone Field */}
          <TabsContent value="phone" className="mt-4">
            <PhoneInputComponent
              inputClassName="!bg-input"
              initialCountry="bd"
              value={watch("phone")}
              onChange={(phone: string) => {
                setValue("phone", phone);
                if (phone.trim()) {
                  clearErrors("identifier");
                }
              }}
              error={errors.phone?.message || errors?.identifier?.message}
            />
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center">
            <Label
              htmlFor="password"
              className="text-xl flex-1 cursor-pointer font-medium leading-none text-default-100 mb-0"
            >
              Password
            </Label>
            <Link
              href={`/${local}/auth/forgot-password`}
              className="text-xl flex-none text-default-200 hover:text-default-100 duration-200 underline"
            >
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            id="password"
            {...register("password")}
            placeholder="Enter your password"
            error={errors.password?.message}
          />
        </div>

        <SubmitButton
          className="w-full font-medium"
          isLoading={isLoginLoading}
          loadingContent="Logging in..."
        >
          Log In
        </SubmitButton>

        <p className="text-lg text-center text-default-200 mt-2">
          {"Don’t have an account? "}
          <Link
            href={`/${local}/auth/register`}
            className="ms-1 text-default-100 hover:text-default-100/80 duration-200 underline"
          >
            Create new account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
