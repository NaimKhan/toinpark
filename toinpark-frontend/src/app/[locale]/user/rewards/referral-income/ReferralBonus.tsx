"use client";

import GradientText from "@/components/feature/text/gradientText";
import { useGetReferralLevelsQuery } from "@/store/api/referral-levels/referral-levels-api";

export default function ReferralBonus() {
  const { data: getReferralLevelsRes, ...getLevelTransactionApiState } =
    useGetReferralLevelsQuery({
      limit: 200,
      sortBy: "createdAt",
      sortOrder: "asc",
    });
  const referralLevelsData = getReferralLevelsRes?.data;
  const data = referralLevelsData?.items ?? [];

  const directReferrals = data.find((item) => item.levelNumber === 1);
  const level2 = data.find((item) => item.levelNumber === 2);

  /* const levelsWithBonusOne: number[] =
    referralLevelsData?.items
      ?.filter((item) => item?.referralBonusPercentage === 1)
      ?.map((item) => item?.levelNumber)
      ?.filter((level): level is number => typeof level === "number") ?? []; */

  const levelsWithBonusOne: number[] =
    referralLevelsData?.items
      ?.filter((item) => item?.referralBonusPercentage === 1)
      ?.map((item) => item?.levelNumber)
      ?.filter(
        (level): level is number =>
          typeof level === "number" && level !== 1 && level !== 2
      ) ?? [];

  const formatLevels = (levels: number[]) => {
    if (!levels.length) return null;
    if (levels.length === 1) return levels[0].toString();

    return `${levels.slice(0, -1).join(", ")} and ${levels.at(-1)}`;
  };

  console.log("data", levelsWithBonusOne);
  return (
    <div className="space-y-4 text-start px-6 py-6 xl:px-16 md:px-10 md:py-12">
      <GradientText
        type="secondary"
        label="Referral Bonus"
        className="text-[28px] md:text-4xl lg:text-5xl font-medium"
      />
      <div className="flex items-center gap-1 text-default-200 text-xl font-medium">
        <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
        <p>
          <span className="text-default-100">
            {directReferrals?.referralBonusPercentage}%
          </span>{" "}
          for direct referrals.
        </p>
      </div>
      <div className="flex items-center gap-1 text-default-200 text-xl font-medium">
        <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
        <p>
          <span className="text-default-100">
            {level2?.referralBonusPercentage}%
          </span>{" "}
          for level 2.
        </p>
      </div>
      <div className="flex items-start gap-1 text-default-200 text-xl font-medium">
        <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mt-2 mr-2 animate-pulse-ring" />

        {levelsWithBonusOne.length > 0 && (
          <p>
            <span className="text-default-100">1%</span> for level{" "}
            {formatLevels(levelsWithBonusOne)}.
          </p>
        )}
      </div>
    </div>
  );
}
