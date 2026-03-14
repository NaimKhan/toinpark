import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/ui/phoneInput";
import { TUserProfile } from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { useProfileEditForm } from "./useProfileEditForm";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

export default function ProfileFormFields({
  userProfileData,
}: {
  userProfileData: TUserProfile | TNullish;
}) {
  const { form, onSubmit, isLoading } = useProfileEditForm(userProfileData);
  const { register, handleSubmit, formState } = form;
  return (
    <div className="flex flex-col gap-10">
      <form
        id="profile--form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-x-16 gap-y-8 text-xl "
      >
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder="Mr. John"
          label="First Name"
          labelClassName="text-base"
          error={form.formState.errors.firstName?.message}
        />
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder="Abraham"
          label="Last Name"
          labelClassName="text-base"
          error={form.formState.errors.lastName?.message}
        />
        <Input
          id="email"
          {...register("email")}
          placeholder="admin@toilab.com"
          label="Email"
          labelClassName="text-base"
          error={form.formState.errors.email?.message}
        />
        <PhoneInputComponent
          placeholder="+1 718 555 4826"
          value={form.watch("phoneNumber")}
          onChange={(phone: string) => {
            form.setValue("phoneNumber", phone, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
          label="Phone Number"
          labelClassName="text-base"
          error={form.formState.errors.phoneNumber?.message}
        />
      </form>
      {/* Save Button */}
      <div className="flex justify-end">
        <SubmitButton
          form="profile--form"
          isLoading={isLoading}
          className="px-6 z w-full"
          disabled={!formState.isDirty}
        >
          Save Changes
        </SubmitButton>
      </div>
    </div>
  );
}
