"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetOfficialAnnouncementsQuery } from "@/store/api/official-announcements/official-announcements.api";
import { TGetOfficialAnnouncementsArgs } from "@/store/api/official-announcements/official-announcements.types";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

function TOINAnnouncementsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetOfficialAnnouncementsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: AnnouncementsRes, ...getAnnouncementsState } =
    useGetOfficialAnnouncementsQuery({
      search: search,
      limit,
      page,
      audienceType: "MEMBER",
      isActive: true,
    });
  const AnnouncementsData = AnnouncementsRes?.data?.items ?? [];

  const AnnouncementsPagination = AnnouncementsRes?.data?.meta;

  return (
    <RenderData
      expectedDataType="array"
      data={AnnouncementsData}
      {...getAnnouncementsState}
    >
      <DefaultTable
        data={AnnouncementsData}
        columns={columns}
        className="text-default-100"
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAnnouncementsState.isLoading ||
              getAnnouncementsState?.isFetching
            }
            totalPages={AnnouncementsPagination?.totalPages}
            hasNext={AnnouncementsPagination?.hasNext}
            hasPrevious={AnnouncementsPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default TOINAnnouncementsTable;
