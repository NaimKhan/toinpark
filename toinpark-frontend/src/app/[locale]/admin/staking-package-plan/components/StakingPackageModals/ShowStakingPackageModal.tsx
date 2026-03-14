"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { useGetAStakingPackageQuery } from "@/store/api/staking-package/staking-package-api";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function ShowStakingPackageModal({
  stakingPackageId,
}: {
  stakingPackageId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: getAStakingPackageRes, ...getAStakingPackageApiState } =
    useGetAStakingPackageQuery(
      { id: stakingPackageId! },
      { skip: !stakingPackageId || !open }
    );

  const getAStakingPackageData = getAStakingPackageRes?.data;

  return (
    <>
      <CommonTooltip content="View">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <EyeIcon />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Stacking Package Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[650px]"
      >
        <RenderData
          expectedDataType="object"
          data={getAStakingPackageData}
          {...getAStakingPackageApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <div className="space-y-5">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-4">
              <InfoCard
                label="Package Name"
                value={getAStakingPackageData?.name}
              />
              <InfoCard
                label="Daily Profit (%)"
                value={getAStakingPackageData?.dailyProfitPercent?.toLocaleString()}
              />
              <InfoCard
                label="Bonus Amount"
                value={getAStakingPackageData?.bonusAmount?.toLocaleString()}
              />
              <InfoCard
                label="Max Toin Amount"
                value={`${getAStakingPackageData?.maxToinAmount}`}
              />
              <InfoCard
                label="Min Toin Amount"
                value={`${getAStakingPackageData?.minToinAmount}`}
              />
              <InfoCard
                label="Minimum Maturity Period (Days)"
                value={`${getAStakingPackageData?.minimumDurationInDays}`}
              />
              <InfoCard
                label="Recurring Profit Days"
                value={`${getAStakingPackageData?.recurringProfitDays}`}
              />
              <InfoCard
                label="Description"
                value={`${getAStakingPackageData?.description}`}
              />
              <InfoCard
                label="Status"
                className=""
                value={
                  <span
                    className={`font-medium px-2 py-2 rounded-md text-sm flex items-center ${
                      getAStakingPackageData?.isActive
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {getAStakingPackageData?.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />
            </div>
          </div>
        </RenderData>
      </CustomDialog>
    </>
  );
}
