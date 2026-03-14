"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import SearchComponent from "@/components/ui/SearchComponent";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetMembersArgs } from "@/store/api/members/members.types";
import { useGetMembersQuery } from "@/store/api/members/members-api";

export default function MemberSummaryReportTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMembersArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();

  const { data: membersRes, ...membersState } = useGetMembersQuery({
    page,
    limit,
    search,
  });

  const membersData = membersRes?.data?.items;
  const membersPagination = membersRes?.data?.meta;

  return (
    <DefaultTable
      data={membersData}
      columns={columns}
      className="text-default-100"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full">
          <div className="flex-1">
            <DropDownMenu />
          </div>
          <div className="flex-none w-64 text-end ">
            <SearchComponent className="h-12" />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData expectedDataType="array" data={membersData} {...membersState}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={membersState.isLoading || membersState.isFetching}
            totalPages={membersPagination?.totalPages}
            hasNext={membersPagination?.hasNext}
            hasPrevious={membersPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
