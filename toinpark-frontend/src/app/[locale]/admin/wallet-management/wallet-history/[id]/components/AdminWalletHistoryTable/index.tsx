"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetMemberTransactionHistoryQuery } from "@/store/api/user -transaction/user -transaction-api";
import { TGetMemberTransactionHistoryArgs } from "@/store/api/user -transaction/user -transaction.type";
import RenderData from "@/components/feature/loader/RenderData";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";

type AdminWalletHistoryTableProps = {
  userId: string;
  search?: string;
};

function AdminWalletHistoryTable({ userId, search }: AdminWalletHistoryTableProps) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMemberTransactionHistoryArgs, void>>();
  const {limit = 10, page } = getAllParamValue();

  const {
    data: getMemberTransactionHistoryRes,
    ...getMemberTransactionHistoryApiState
  } = useGetMemberTransactionHistoryQuery({
    userId,
    page,
    limit,
    search: search,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const transactionData = getMemberTransactionHistoryRes?.data?.items || [];
  const pagination = getMemberTransactionHistoryRes?.data?.meta;

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
        showEmptyState={false}
        {...getMemberTransactionHistoryApiState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getMemberTransactionHistoryApiState.isLoading ||
              getMemberTransactionHistoryApiState?.isFetching
            }
            totalPages={pagination?.totalPages}
            hasNext={pagination?.hasNext}
            hasPrevious={pagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default AdminWalletHistoryTable;
