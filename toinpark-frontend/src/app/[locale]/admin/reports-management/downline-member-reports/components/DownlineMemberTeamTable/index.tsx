"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import RenderData from "@/components/feature/loader/RenderData";

import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import { TGetMemberTeamArgs } from "@/store/api/member-team/member-team.types";
import { useGetMemberTeamQuery } from "@/store/api/member-team/member-team.api";

type DownlineMemberTeamTableProps = {
  memberId: string;
};

export default function DownlineMemberTeamTable({ memberId }: DownlineMemberTeamTableProps) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMemberTeamArgs, void>>();
  const { search, limit = 10, page, startDate, endDate } = getAllParamValue();

  const { data: teamRes, ...getTeamState } = useGetMemberTeamQuery({
    id: memberId,
    limit,
    search,
    page,
    startDate,
    endDate,
  });
  const teamData = teamRes?.data;
  const paginatedData = teamData?.items;
  const downlineMemberTeamPagination = teamData?.meta;

  return (
    <DefaultTable
      data={paginatedData}
      columns={columns}
      className="text-default-100"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center w-full">
          <div className="flex-1">
            <DropDownMenu />
          </div>
          <div className="flex-none flex flex-wrap gap-x-8 gap-y-3">
            <div className="space-y-1">
              <p className="text-sm uppercase font-medium text-default-100/40 tracking-widest">
                Sponsor ID
              </p>
              <p className="text-md font-semibold text-primary">
                {teamData?.memberInfo?.toinAccountNumber || "-"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm uppercase font-medium text-default-100/40 tracking-widest">
                Sponsor Name
              </p>
              <p className="text-md font-semibold text-default-100">
                {teamData?.memberInfo?.fullName || "-"}
              </p>
            </div>
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={paginatedData}
        {...getTeamState}
      >
        <div className="max-h-[70vh] overflow-auto">
          <DefaultTable.Table />
        </div>
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={getTeamState.isLoading || getTeamState.isFetching}
            totalPages={downlineMemberTeamPagination?.totalPages}
            hasNext={downlineMemberTeamPagination?.hasNext}
            hasPrevious={downlineMemberTeamPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

