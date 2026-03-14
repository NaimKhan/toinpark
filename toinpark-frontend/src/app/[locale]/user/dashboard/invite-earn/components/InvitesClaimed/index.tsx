"use client";
import RenderData from "@/components/feature/loader/RenderData";
import GradientText from "@/components/feature/text/gradientText";
import {
  useGetInvitationClaimedQuery,
  useGetReferralMilestoneQuery,
} from "@/store/api/user-dashboard/user-dashboard-api";
import Image from "next/image";

function InvitesClaimed() {
  const { data: invitationClaimedRes, ...invitationClaimedState } =
    useGetInvitationClaimedQuery();

  const invitationClaimedData = invitationClaimedRes?.data;

  const { data: referralMilestoneRes, ...referralMilestoneState } =
    useGetReferralMilestoneQuery();

  const referralMilestoneData = referralMilestoneRes?.data;

  return (
    <div className="w-full space-y-6 md:space-y-10 px-6 py-6 xl:px-16 md:px-10 md:py-12">
      {/* Header */}
      <RenderData
        expectedDataType="object"
        data={invitationClaimedData}
        {...invitationClaimedState}
      >
        <div>
          <GradientText
            label={`${invitationClaimedData?.display} Invites Claimed`}
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium"
          />
          <p className="text-lg text-default-200">
            Next reward at {invitationClaimedData?.targetPerson} invites
          </p>
        </div>
      </RenderData>

      {/* Rewards */}
      <RenderData
        expectedDataType="array"
        data={referralMilestoneData}
        showEmptyState={true}
        {...referralMilestoneState}
      >
        <div className="space-y-2 md:space-y-4">
          {referralMilestoneData?.map((item) => (
            <div
              className="flex justify-between items-center px-6 py-5 rounded-lg border "
              key={item?.id}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/all/Price-1.png"
                  alt={item?.referralName ?? "Progress Bar"}
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-lg"> {item?.referralName}</span>
              </div>
              <span className="text-base text-default-200">
                {item?.targetPerson} Friends - {item?.toinAmount} TONS
              </span>
            </div>
          ))}
        </div>
      </RenderData>

      {/* Activity
      <div className="flex items-center gap-2">
        <Image
          src="/images/all/avatar.png"
          alt="Avatar"
          width={28}
          height={28}
          className="inline-block mr-2 rounded-full"
        />
        <p className="text-base text-default-200">
          Alex just joined using your invite!
        </p>
      </div> */}
    </div>
  );
}

export default InvitesClaimed;
