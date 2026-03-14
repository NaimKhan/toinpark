"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import SearchComponentByDate from "@/components/feature/table/SearchComponentByDate";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetDirectMembersQuery } from "@/store/api/direct-member-reports/direct-member-reports-api";
import { TGetDirectMembersArgs } from "@/store/api/direct-member-reports/direct-member-reports.types";

export default function DirectMemberReportsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetDirectMembersArgs, void>>();
  const { search, limit = 10, page, startDate, endDate } = getAllParamValue();
  const { data: getDirectMembersRes, ...getDirectMembersState } =
    useGetDirectMembersQuery({
      search,
      page,
      limit,
      joinedFrom: startDate,
      joinedTo: endDate,
    });

  const directMemberData = getDirectMembersRes?.data?.items;
  const directMemberPagination = getDirectMembersRes?.data?.meta;

  return (
    <DefaultTable
      data={directMemberData}
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
          <div className="flex-none text-end ">
            <SearchComponentByDate />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={directMemberData}
        {...getDirectMembersState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getDirectMembersState.isLoading ||
              getDirectMembersState.isFetching
            }
            totalPages={directMemberPagination?.totalPages}
            hasNext={directMemberPagination?.hasNext}
            hasPrevious={directMemberPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
