"use client";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/PasswordInput";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useChangePasswordForm } from "@/components/modules/change-password/useChangePasswordForm";
import { Link } from "@/components/navigation";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function ChangePasswordForm() {
  const { formProps, onSubmit, isLoading } = useChangePasswordForm();
  const local = useDefaultLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = formProps;

  return (
    <div className="w-full lg:w-[624px] xl:w-[705px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Current Password */}
        <PasswordInput
          id="current-password"
          label="Current Password"
          placeholder="Enter current password"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        {/* New Password */}
        <PasswordInput
          id="new-password"
          label="New Password"
          placeholder="Enter new password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirm-password"
          label="Confirm New Password"
          placeholder="Re-enter new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <SubmitButton
            isLoading={isLoading}
            className="px-12 text-lg font-medium"
          >
            Update
          </SubmitButton>

          <Button
            asChild
            type="reset"
            variant="outline"
            color="destructive"
            className="px-12 text-lg font-medium"
            onClick={() => reset()}
          >
            <Link href={`/user/profile`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
