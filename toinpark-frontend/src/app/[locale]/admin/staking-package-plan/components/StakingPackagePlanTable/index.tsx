"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetStakingPackagesQuery } from "@/store/api/staking-package/staking-package-api";
import { TGetStakingPackagesArgs } from "@/store/api/staking-package/staking-package.type";
import RenderData from "@/components/feature/loader/RenderData";

function StakingPackagePlanTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetStakingPackagesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getStakingPackagesRes, ...getStakingPackagesApiState } =
    useGetStakingPackagesQuery({ search: search, limit, page });
  const stakingPackagesData = getStakingPackagesRes?.data?.items;
  const stakingPackagesPagination = getStakingPackagesRes?.data?.meta;
  return (
    <>
      <DefaultTable
        data={stakingPackagesData}
        columns={columns}
        className="text-default-100"
      >
        <DefaultTable.TitleContainer>
          <div className="flex flex-wrap justify-between gap-4 items-center w-full">
            <div className="flex-1">
              <DropDownMenu />
            </div>
            <div className="flex-none w-64 text-end ">
              <SearchComponent className="h-12" />
            </div>
          </div>
        </DefaultTable.TitleContainer>
        <RenderData
          expectedDataType="array"
          data={stakingPackagesData}
          {...getStakingPackagesApiState}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getStakingPackagesApiState.isLoading ||
                getStakingPackagesApiState?.isFetching
              }
              totalPages={stakingPackagesPagination?.totalPages}
              hasNext={stakingPackagesPagination?.hasNext}
              hasPrevious={stakingPackagesPagination?.hasPrevious}
            />
          </DefaultTable.Footer>
        </RenderData>
      </DefaultTable>
    </>
  );
}

export default StakingPackagePlanTable;
