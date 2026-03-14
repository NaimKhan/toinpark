"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import PasswordInput from "@/components/ui/PasswordInput";
import { useResetPassword } from "./useResetPassword";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function ResetPasswordForm() {
  const {
    formProps: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isLoading,
  } = useResetPassword();
  const local = useDefaultLocale();

  return (
    <div className="w-full ">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="OTP code"
          type="text"
          placeholder="Enter OTP code"
          {...register("otp")}
          error={errors?.otp?.message}
        />
        <PasswordInput
          id="new-password"
          label="New password"
          placeholder="Enter new password"
          {...register("newPassword")}
          error={errors?.newPassword?.message}
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm password"
          placeholder="Confirm password"
          {...register("passwordConfirmation")}
          error={errors?.passwordConfirmation?.message}
        />
        <SubmitButton actionContent="Reset Password" isLoading={isLoading} />
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

export default ResetPasswordForm;
