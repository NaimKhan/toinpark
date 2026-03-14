"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetMembersQuery } from "@/store/api/members/members-api";
import { TGetMembersArgs } from "@/store/api/members/members.types";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

export default function RegisteredMemberTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMembersArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getMembersRes, ...getMembersState } = useGetMembersQuery({
    search: search,
    limit,
    page,
  });

  const membersData = getMembersRes?.data?.items;
  const membersPagination = getMembersRes?.data?.meta;

  return (
    <DefaultTable
      data={membersData}
      columns={columns}
      className="text-default-100"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full ">
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
        data={membersData}
        {...getMembersState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={getMembersState.isLoading || getMembersState?.isFetching}
            totalPages={membersPagination?.totalPages}
            hasNext={membersPagination?.hasNext}
            hasPrevious={membersPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
