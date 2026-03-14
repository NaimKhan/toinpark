"use client";
import { Separator } from "@/components/ui/separator";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";
import ProfileImageSection from "./ProfileImageSection";
import ProfileFormFields from "./ProfileFormFields";
import GradientText from "@/components/feature/text/gradientText";

export default function ProfileSettingsClient() {
  const { data: UserProfileRes } = useGetUserProfileQuery();
  const userProfileData = UserProfileRes?.data;

  return (
    <div className="bg-background text-default-100 flex flex-col">
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="Profile"
          className="text-xl font-semibold whitespace-nowrap"
        />
      </div>
      <section className="flex justify-center md:justify-start p-4 md:p-8">
        <ProfileImageSection profileImageUrl={userProfileData?.media?.url} />
      </section>

      <Separator />

      {/* Form Section */}
      <section className="p-4 md:p-10">
        <ProfileFormFields userProfileData={userProfileData} />
      </section>
    </div>
  );
}
