"use client";

import GradientText from "@/components/feature/text/gradientText";
import { useGetUserToinsSummeryQuery } from "@/store/api/user-dashboard/user-dashboard-api";

function ReferralIncomeTitle() {
      const { data: userProfileRes } =
    useGetUserToinsSummeryQuery();

  const userProfileData = userProfileRes?.data;

  const balance = userProfileData?.totalLevelingBonus ?? 0;
    return (
        <div className="space-y-4 text-start px-6 py-6 xl:px-16 md:px-10 md:py-12 border-b md:border-b-0 md:border-r border-border">
          <div className="flex items-center text-default-100 text-xl font-medium">
            <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
            <GradientText
              type="secondary"
              label="Total Gross Commission"
              className="text-base md:text-xl font-medium"
            />
          </div>
          <div className="text-default-200 text-[32px] md:text-5xl mt-4 font-medium">
            {balance} TOIN
          </div>
        </div>
    );
}

export default ReferralIncomeTitle;