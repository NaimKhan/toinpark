"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetUserTransactionArgs } from "@/store/api/user -transaction/user -transaction.type";
import { useGetUserTransactionQuery } from "@/store/api/user -transaction/user -transaction-api";
import RenderData from "@/components/feature/loader/RenderData";

function ReferralIncomeTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetUserTransactionArgs, void>>();
  const { page, limit = 10, search } = getAllParamValue();
  const { data: getUserTransactionRes, ...getUserTransactionApiState } =
    useGetUserTransactionQuery({
      search,
      page,
      limit,
      trxType: "LEVELING_BONUS",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  const userTransactionData = getUserTransactionRes?.data?.items;
  const userTransactionPagination = getUserTransactionRes?.data?.meta;
  return (
    <RenderData data={userTransactionData} expectedDataType="array">
      <DefaultTable data={userTransactionData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getUserTransactionApiState.isLoading ||
              getUserTransactionApiState?.isFetching
            }
            totalPages={userTransactionPagination?.totalPages}
            hasNext={userTransactionPagination?.hasNext}
            hasPrevious={userTransactionPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default ReferralIncomeTable;
