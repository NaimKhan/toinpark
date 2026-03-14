"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetMemberWithdrawalRequestsQuery } from "@/store/api/withdrawal-requests/withdrawal-requests-api";
import { TGetMemberWithdrawalRequestsArgs } from "@/store/api/withdrawal-requests/withdrawal-requests.type";
import RenderData from "@/components/feature/loader/RenderData";

function WithdrawalHistoryTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMemberWithdrawalRequestsArgs, void>>();
  const { limit = 10, page } = getAllParamValue();
  const { data: getWithdrawalRequestsRes, ...getWithdrawalRequestsApiState } =
    useGetMemberWithdrawalRequestsQuery({
      limit,
      page,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const withdrawalData = Array.isArray(getWithdrawalRequestsRes?.data)
    ? getWithdrawalRequestsRes?.data
    : (getWithdrawalRequestsRes?.data as any)?.items || [];
  const withdrawalPagination =
    getWithdrawalRequestsRes?.pagination ||
    (getWithdrawalRequestsRes?.data as any)?.meta;

  return (
    <RenderData
      expectedDataType="array"
      data={withdrawalData}
      showEmptyState={false}
      {...getWithdrawalRequestsApiState}
    >
      <DefaultTable data={withdrawalData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getWithdrawalRequestsApiState.isLoading ||
              getWithdrawalRequestsApiState?.isFetching
            }
            totalPages={withdrawalPagination?.totalPages}
            hasNext={withdrawalPagination?.hasNext}
            hasPrevious={withdrawalPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default WithdrawalHistoryTable;
