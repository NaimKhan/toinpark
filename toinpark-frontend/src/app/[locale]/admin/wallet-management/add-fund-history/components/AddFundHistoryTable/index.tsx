"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAdminStakesQuery } from "@/store/api/admin-staking/admin-staking-api";
import { TGetAdminStakesArgs } from "@/store/api/admin-staking/admin-staking.types";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

function AddFundHistoryTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAdminStakesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();

  const { data: adminStakesRes, ...getAdminStakesState } =
    useGetAdminStakesQuery({
      search: search,
      limit,
      page,
    });

  const adminStakesData = adminStakesRes?.data?.items;
  const adminStakesPagination = adminStakesRes?.data?.meta;

  return (
    <DefaultTable
      data={adminStakesData}
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
        data={adminStakesData}
        {...getAdminStakesState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAdminStakesState.isLoading || getAdminStakesState?.isFetching
            }
            totalPages={adminStakesPagination?.totalPages}
            hasNext={adminStakesPagination?.hasNext}
            hasPrevious={adminStakesPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default AddFundHistoryTable;
