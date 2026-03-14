"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetMyStakesQuery } from "@/store/api/user-staking-package/user-staking-package-api";
import { TGetMyStakesArgs } from "@/store/api/user-staking-package/user-staking-package.type";
import RenderData from "@/components/feature/loader/RenderData";

function StackingHistoryTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMyStakesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getMyStakesRes, ...getMyStakesApiState } = useGetMyStakesQuery({
    search: search,
    limit: limit,
    page,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const stakingData = Array.isArray(getMyStakesRes?.data)
    ? getMyStakesRes?.data
    : (getMyStakesRes?.data as any)?.items || [];
  const stakingPagination =
    getMyStakesRes?.pagination || (getMyStakesRes?.data as any)?.meta;

  return (
    <RenderData
      expectedDataType="array"
      data={stakingData}
      showEmptyState={false}
      {...getMyStakesApiState}
    >
      <DefaultTable data={stakingData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getMyStakesApiState.isLoading || getMyStakesApiState?.isFetching
            }
            totalPages={stakingPagination?.totalPages}
            hasNext={stakingPagination?.hasNext}
            hasPrevious={stakingPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default StackingHistoryTable;
