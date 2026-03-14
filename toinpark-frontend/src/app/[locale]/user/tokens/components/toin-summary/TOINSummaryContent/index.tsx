"use client";

import TOINCreditCard from "../TOINCraditCard";
import FormattedBalance from "@/lib/number/NumberToCurrency";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";

function TOINSummaryContent() {
  const { data: userProfileRes } = useGetUserProfileQuery();

  const userProfileData = userProfileRes?.data;

  const balance = userProfileData?.walletBalance ?? 0;
  return (
    <div className="my-6 md:my-10 space-y-6 md:space-y-12">
      <TOINCreditCard
        label="Balance in your TOIN Wallet"
        amount={`${FormattedBalance(balance)} TOIN`}
      />
    </div>
  );
}

export default TOINSummaryContent;
