"use client";

import GradientText from "@/components/feature/text/gradientText";
import RenderData from "@/components/feature/loader/RenderData";
import FormattedBalance from "@/lib/number/NumberToCurrency";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";

export function BalanceCard() {
  const { data: userProfileRes, ...getUserProfileApiState } =
    useGetUserProfileQuery();

  const userProfileData = userProfileRes?.data;

  const balance = userProfileData?.walletBalance ?? 0;
  // Format numbers

  return (
    <div className="flex md:flex-col justify-between md:justify-start items-center md:items-start">
      <div className="w-full">
        <div className="flex items-center md:mb-6">
          <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring"></div>
          <GradientText label="TOIN Balance" className="text-xl font-medium" />
        </div>

        <div className="w-full overflow-clip">
          <RenderData
            expectedDataType="object"
            data={userProfileData}
            {...getUserProfileApiState}
          >
            <h2 className="text-[28px] md:text-4xl lg:text-5xl text-default-200 font-bold mt-2 md:mt-4 w-full">
              {FormattedBalance(balance)}
            </h2>
          </RenderData>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
