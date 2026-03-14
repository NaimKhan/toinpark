"use client";

import GradientText from "@/components/feature/text/gradientText";
import UserIcon from "@/components/svg/UserIcon";
import { Button } from "@/components/ui/button";
import SearchComponent from "@/components/ui/SearchComponent";
import { useGetLoggedInUser } from "@/hooks/feature/useGetLoggedInUser";
import { useGetReferralLevelsMemberQuery } from "@/store/api/referral-levels/referral-levels-api";
import { useGetReferralLinkQuery } from "@/store/api/user-dashboard/user-dashboard-api";

export default function PageHeaderContent() {
  const { getUser } = useGetLoggedInUser();
  const { data: referralLinkRes } = useGetReferralLinkQuery();
  const { data: getReferralLevelsRes } = useGetReferralLevelsMemberQuery({
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const totalReferralMembers =
    getReferralLevelsRes?.data?.totalReferralMembers || 0;

  const referralLinkData = referralLinkRes?.data;
  return (
    <>
      <div className="space-y-2 md:space-y-4 text-start border-b px-6 pt-10 pb-8 xl:px-16 md:px-10 md:py-12">
        <GradientText
          type="secondary"
          label="Total Referral Members"
          className="text-[28px] md:text-[40px] font-medium"
        />
        <div className="flex items-center gap-2 text-primary">
          <UserIcon color="primary" className="w-8 h-8 md:w-10 md:h-10" />
          <h3 className="text-2xl md:text-[40px] font-medium text-default-100">
            {totalReferralMembers}
          </h3>
        </div>
      </div>
      <div className="px-6 xl:px-16 md:px-10 space-y-6 pb-5 md:pb-0">
        <div className="flex flex-wrap items-end gap-6 w-full ">
          <div className="space-y-4 flex-1 text-start">
            <div className="flex items-center justify-start gap-4">
              <GradientText
                type="secondary"
                label="Referral Tree"
                className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
              />
              <Button variant="outline" className="text-primary">
                {referralLinkData || "N/A"}
              </Button>
            </div>
            <p className="text-default-200 text-lg font-normal  mx-auto">
              Explore your level-wise referral network and see all users linked
              to your TOIN account (ID: {getUser?.toinAccountNumber || "N/A "}).
            </p>
          </div>
          <div className="flex-none">
            <SearchComponent
              placeholder="Search by level number"
              className="w-full !h-12"
            />
          </div>
        </div>
      </div>
    </>
  );
}
