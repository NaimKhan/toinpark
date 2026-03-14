"use client";
import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import { useGetMembersQuery } from "@/store/api/members/members-api";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetMembersArgs } from "@/store/api/members/members.types";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

function ManageUserEwalletTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMembersArgs, void>>();
  const { search, limit = 10, page = 1 } = getAllParamValue();

  const { data: getMembersRes, ...getMembersState } = useGetMembersQuery({
    status: "ACTIVE",
    search: search || undefined,
    limit,
    page,
  });

  const memberData = getMembersRes?.data?.items || [];
  const pagination = getMembersRes?.data?.meta;

  return (
    <DefaultTable
      data={memberData}
      columns={columns as any}
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
        data={memberData}
        {...getMembersState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={getMembersState.isLoading || getMembersState?.isFetching}
            totalPages={pagination?.totalPages}
            hasNext={pagination?.hasNext}
            hasPrevious={pagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default ManageUserEwalletTable;
