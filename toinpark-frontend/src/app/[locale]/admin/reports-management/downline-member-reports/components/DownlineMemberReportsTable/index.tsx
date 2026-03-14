"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetDownlineMembersQuery } from "@/store/api/downline-member-reports/downline-member-reports-api";
import { TGetDownlineMembersArgs } from "@/store/api/downline-member-reports/downline-member-reports.type";
import SearchComponentByDate from "@/components/feature/table/SearchComponentByDate";

export default function DownlineMemberReportsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetDownlineMembersArgs, void>>();
  const {
    search,
    limit = 10,
    page = 1,
    sortBy = "createdAt",
    sortOrder = "desc",
    startDate,
    endDate,
  } = getAllParamValue();
  const { data: getDownlineMembersRes, ...getDownlineMembersState } =
    useGetDownlineMembersQuery({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      joinedFrom : startDate,
      joinedTo : endDate,
    });

  const downlineMemberData = getDownlineMembersRes?.data?.items;
  const downlineMemberPagination = getDownlineMembersRes?.data?.meta;

  return (
    <DefaultTable
      data={downlineMemberData}
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
          <div className="flex-none text-end ">
            <SearchComponentByDate />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={downlineMemberData}
        {...getDownlineMembersState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getDownlineMembersState.isLoading ||
              getDownlineMembersState.isFetching
            }
            totalPages={downlineMemberPagination?.totalPages}
            hasNext={downlineMemberPagination?.hasNext}
            hasPrevious={downlineMemberPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
