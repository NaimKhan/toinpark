"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordInput from "@/components/ui/PasswordInput";
import PhoneInputComponent from "@/components/ui/phoneInput";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { EUserSignUpType } from "@/store/api/auth/auth.types";
import { useRegisterForm } from "./useRegisterForm";

function RegisterForm() {
  const {
    formProps: {
      register,
      handleSubmit,
      setValue,
      trigger,
      watch,
      clearErrors,
      formState: { errors },
    },
    onSubmit,
    isUserSignUpLoading,
    type,
  } = useRegisterForm();
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Tabs
          value={type === EUserSignUpType.EMAIL ? "email" : "phone"}
          onValueChange={(v) => {
            const newType =
              v === "email" ? EUserSignUpType.EMAIL : EUserSignUpType.PHONE;
            setValue("type", newType);

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
              error={errors?.email?.message || errors?.identifier?.message}
            />
          </TabsContent>

          {/* Phone */}
          <TabsContent value="phone" className="mt-4">
            <PhoneInputComponent
              inputClassName="bg-input"
              initialCountry="bd"
              value={watch("phone")}
              onChange={(phone: string) => {
                setValue("phone", phone);
                if (phone.trim()) {
                  clearErrors("identifier");
                }
              }}
              error={errors?.phone?.message || errors?.identifier?.message}
            />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Enter your first name"
            label="First Name"
            error={errors.firstName?.message}
          />

          <Input
            id="lastName"
            label="Last Name"
            {...register("lastName")}
            placeholder="Enter your last name"
            error={errors.lastName?.message}
          />
        </div>

        <PasswordInput
          id="password"
          label="Password"
          {...register("password")}
          placeholder="Enter your password"
          error={errors.password?.message}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="Confirm Password"
          {...register("passwordConfirmation")}
          placeholder="Confirm your password"
          error={errors.passwordConfirmation?.message}
        />

        <SubmitButton
          className="w-full font-medium"
          isLoading={isUserSignUpLoading}
          loadingContent="Creating account..."
        >
          Create account
        </SubmitButton>

        <p className="text-lg text-center text-default-200 mt-2 pb-5">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-default-100 hover:text-default-100/80 duration-200 underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
