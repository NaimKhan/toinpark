"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetRecentTransactionsQuery } from "@/store/api/recent-transaction-reports/recent-transaction-reports-api";
import { TGetRecentTransactionsArgs } from "@/store/api/recent-transaction-reports/recent-transaction-reports.types";

export default function RecentTransactionReportsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetRecentTransactionsArgs, void>>();
  const {
    search,
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = getAllParamValue();
  const { data: getRecentTransactionsRes, ...getRecentTransactionsState } =
    useGetRecentTransactionsQuery({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });

  const transactionData = getRecentTransactionsRes?.data?.items;
  const transactionPagination = getRecentTransactionsRes?.data?.meta;

  return (
    <DefaultTable
      data={transactionData}
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
        expectedDataType="array"
        data={transactionData}
        {...getRecentTransactionsState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getRecentTransactionsState.isLoading ||
              getRecentTransactionsState.isFetching
            }
            totalPages={transactionPagination?.totalPages}
            hasNext={transactionPagination?.hasNext}
            hasPrevious={transactionPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
