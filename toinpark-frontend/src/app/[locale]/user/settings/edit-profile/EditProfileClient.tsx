"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/navigation";
import LeftArrow from "@/components/svg/LeftArrow";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";
import { useProfileEditForm } from "./useProfileEditForm";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import ProfileFormFields from "./ProfileFormFields";
import ProfileSection from "./ProfileImageSection";
import RenderData from "@/components/feature/loader/RenderData";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import PhoneAndEmailFormFields from "./PhoneAndEmailFormFields";

function EditProfileClient() {
  const { data: UserProfileRes, ...getUserProfileApiState } =
    useGetUserProfileQuery();
  const userProfileData = UserProfileRes?.data;
  const local = useDefaultLocale();

  const { form, onSubmit, isLoading } = useProfileEditForm(userProfileData);
  const { register, handleSubmit } = form;

  return (
    <RenderData
      data={UserProfileRes?.data ?? {}}
      {...getUserProfileApiState}
      expectedDataType="object"
    >
      <div className="bg-background min-h-screen text-default-100 ">
        <div className="flex justify-between items-start px-6 py-6 xl:px-16 md:px-10 md:py-12 ">
          {/* Profile Image Section */}
          <ProfileSection profileImageUrl={userProfileData?.media?.url} />

          <Button
            asChild
            variant="default"
            className="bg-transparent border border-input md:border-none md:bg-input text-lg text-default-100 hover:text-default-900 px-2 md:px-4 !h-10 !md:h-12 "
          >
            <Link href={`/user/profile`}>
              <LeftArrow className="!w-6 !h-6" />
            </Link>
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-10 px-6 py-10 md:px-10 xl:px-16 md:py-12">
          <form
            id="profile-edit-form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 text-xl"
          >
            <ProfileFormFields
              form={form}
              register={register}
              userProfileData={userProfileData}
            />
          </form>

          <div className="flex gap-4">
            <SubmitButton
              form="profile-edit-form"
              isLoading={isLoading}
              className="px-12 md:px-16 py-[10px]"
            >
              Save
            </SubmitButton>
          </div>
        </div>
        <PhoneAndEmailFormFields
          form={form}
          register={register}
          userProfileData={userProfileData}
        />
      </div>
    </RenderData>
  );
}

export default EditProfileClient;
