"use client";
import { useGetActiveStakingPackagesQuery } from "@/store/api/staking-package/staking-package-api";
import { TGetActiveStakingPackagesArgs } from "@/store/api/staking-package/staking-package.type";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import RenderData from "@/components/feature/loader/RenderData";
import StakingPackageCard from "./StackingPackageCard";

function StackingPackagesCardContent() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetActiveStakingPackagesArgs, void>>();
  const { search, limit = 50, page } = getAllParamValue();
  const { data: StakingPackagesRes, ...getStakingPackagesApiState } =
    useGetActiveStakingPackagesQuery({ search: search, limit, page });
  const StakingPackagesData = StakingPackagesRes?.data;

  return (
    <RenderData
      expectedDataType="array"
      data={StakingPackagesData?.items}
      showEmptyState={true}
      {...getStakingPackagesApiState}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 px-6 md:px-12 xl:px-16 gap-6 mx-auto">
        {StakingPackagesData?.items?.map((pkg) => (
          <StakingPackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </RenderData>
  );
}

export default StackingPackagesCardContent;
