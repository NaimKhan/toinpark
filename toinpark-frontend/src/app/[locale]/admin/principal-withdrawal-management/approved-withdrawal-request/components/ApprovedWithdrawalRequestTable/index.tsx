"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import { useGetWithdrawalRequestsQuery } from "@/store/api/withdrawal-requests/withdrawal-requests-api";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";

type TWithdrawalParamState = {
  limit?: number;
  page?: number;
  search?: string;
};

export default function ApprovedWithdrawalRequestTable() {
  const { getAllParamValue } = useManageSearchParams<TWithdrawalParamState>();
  const { limit = 10, page, search } = getAllParamValue();

  const { data: res, ...apiState } = useGetWithdrawalRequestsQuery({
    status: "APPROVED",
    page,
    limit,
    search,
  });

  const withdrawalData = Array.isArray(res?.data)
    ? res?.data
    : (res?.data as any)?.items || [];
  const pagination = res?.pagination || (res?.data as any)?.meta;

  return (
    <DefaultTable
      data={withdrawalData}
      columns={columns}
      className="text-default-100"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full">
          <div className="flex-1">
            <DropDownMenu />
          </div>
          <div className="flex-none w-64 text-end">
            <SearchComponent className="h-12" />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        data={withdrawalData}
        expectedDataType="array"
        showEmptyState={false}
        {...apiState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer className="border-0 flex flex-col items-center gap-4 py-4">
          <BasicPagination
            totalPages={pagination?.totalPages}
            isLoading={apiState.isLoading || apiState.isFetching}
            hasNext={pagination?.hasNext}
            hasPrevious={pagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
