"use client";
import PasswordInput from "@/components/ui/PasswordInput";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useChangePasswordForm } from "@/components/modules/change-password/useChangePasswordForm";

function ChangePasswordForm() {
  const { formProps, onSubmit, isLoading } = useChangePasswordForm();

  const { register, handleSubmit, formState } = formProps;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-default-100 space-y-4"
    >
      <PasswordInput
        label="Current Password"
        placeholder="Enter current password"
        labelClassName="text-base"
        className="h-12 text-sm font-light"
        {...register("currentPassword")}
        error={formState.errors.currentPassword?.message}
      />
      <PasswordInput
        placeholder="Enter new Password"
        label="Enter New Password"
        labelClassName="text-base"
        className="h-12 text-sm font-light"
        {...register("newPassword")}
        error={formState.errors.newPassword?.message}
      />
      <PasswordInput
        placeholder="Retype new Password"
        label="Retype New Password"
        labelClassName="text-base"
        className="h-12 text-sm font-light"
        {...register("confirmPassword")}
        error={formState.errors.confirmPassword?.message}
      />
      <SubmitButton
        isLoading={isLoading}
        className="!h-12 font-light md:font-medium w-full mt-5 text-default-900"
        disabled={!formState.isDirty}
      >
        Submit
      </SubmitButton>
    </form>
  );
}

export default ChangePasswordForm;
