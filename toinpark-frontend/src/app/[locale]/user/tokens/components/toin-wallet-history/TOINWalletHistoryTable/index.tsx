"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetUserTransactionArgs } from "@/store/api/user -transaction/user -transaction.type";
import { useGetUserTransactionQuery } from "@/store/api/user -transaction/user -transaction-api";
import RenderData from "@/components/feature/loader/RenderData";

function TOINWalletHistoryTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetUserTransactionArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const {
    data: getUserWiseAllTransactionRes,
    ...getUserWiseAllTransactionApiState
  } = useGetUserTransactionQuery({
    search: search,
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const userWiseAllTransactionData = getUserWiseAllTransactionRes?.data?.items;
  const userWiseAllTransactionPagination =
    getUserWiseAllTransactionRes?.data?.meta;
  return (
    <RenderData
      expectedDataType="array"
      data={userWiseAllTransactionData}
      {...getUserWiseAllTransactionApiState}
    >
      <DefaultTable data={userWiseAllTransactionData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getUserWiseAllTransactionApiState.isLoading ||
              getUserWiseAllTransactionApiState?.isFetching
            }
            totalPages={userWiseAllTransactionPagination?.totalPages}
            hasNext={userWiseAllTransactionPagination?.hasNext}
            hasPrevious={userWiseAllTransactionPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default TOINWalletHistoryTable;
