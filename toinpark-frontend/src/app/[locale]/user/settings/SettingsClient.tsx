"use client";
import GradientText from "@/components/feature/text/gradientText";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import RenderData from "@/components/feature/loader/RenderData";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function SettingsClient() {
  const { data: getUserProfileRes, ...getUserProfileApiState } =
    useGetUserProfileQuery();
  const userProfileData = getUserProfileRes?.data;
  const local = useDefaultLocale();

  return (
    <div className="bg-background min-h-screen text-default-100">
      {/* Header */}
      <RenderData
        data={userProfileData ?? {}}
        {...getUserProfileApiState}
        expectedDataType="object"
      >
        {/* Profile Image */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start px-6 py-6 xl:px-16 md:px-10 md:py-12 ">
          <div>
            <Image
              src={getFallbackImage({ src: userProfileData?.media?.url })}
              alt={userProfileData?.fullName || "User Profile"}
              width={160}
              height={160}
              className="rounded-full !w-32 !md:w-40 !h-32 !md:h-40 object-cover"
            />
            <GradientText
              label={userProfileData?.fullName || ""}
              className="text-xl md:text-[28px] font-semibold mt-4 md:mt-7 whitespace-nowrap"
            />
            <p className="text-base font-medium text-primary mt-1">
              {userProfileData?.toinAccountNumber}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-end items-center">
            <Button
              asChild
              variant="default"
              className="bg-input text-base py-2 md:text-lg text-default-100 hover:text-default-900 px-5 md:py-[13px]"
            >
              <Link href={`/${local}/user/settings/edit-profile`}>
                Edit Profile
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="bg-input text-base py-2 md:text-lg text-default-100 hover:text-default-900 px-5 md:py-[13px]"
            >
              <Link href={`/${local}/user/settings/change-password`}>
                Change Password
              </Link>
            </Button>
          </div>
        </div>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 px-6 py-6 xl:px-16 md:px-10 md:py-12 ">
          <div className="space-y-12">
            {userProfileData?.email && (
              <div>
                <p className="font-medium mb-3 text-lg">Email</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.email}
                </p>
              </div>
            )}
            {userProfileData?.phoneNumber && (
              <div>
                <p className="font-medium mb-3 text-lg">Contact Number</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.phoneNumber}
                </p>
              </div>
            )}
            {userProfileData?.addressLine1 && (
              <div>
                <p className="font-medium mb-3 text-lg">Address</p>
                <p className="text-lg font-normal text-default-200 max-w-[280px]">
                  {userProfileData?.addressLine1}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-12">
            {userProfileData?.country?.name && (
              <div>
                <p className="font-medium mb-3 text-lg">Country</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.country?.name}
                </p>
              </div>
            )}

            {userProfileData?.state?.name && (
              <div>
                <p className="font-medium mb-3 text-lg">State</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.state?.name}
                </p>
              </div>
            )}

            {userProfileData?.city && (
              <div>
                <p className="font-medium mb-3 text-lg">City</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.city}
                </p>
              </div>
            )}
            {userProfileData?.zipCode && (
              <div>
                <p className="font-medium mb-3 text-lg">Zip Code</p>
                <p className="text-lg font-normal text-default-200">
                  {userProfileData?.zipCode}
                </p>
              </div>
            )}
          </div>
        </div>
      </RenderData>
    </div>
  );
}

export default SettingsClient;
