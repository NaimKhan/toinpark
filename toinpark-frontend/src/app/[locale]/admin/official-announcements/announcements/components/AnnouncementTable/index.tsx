"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetOfficialAnnouncementsArgs } from "@/store/api/official-announcements/official-announcements.types";
import { useGetOfficialAnnouncementsQuery } from "@/store/api/official-announcements/official-announcements.api";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

export default function AnnouncementTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetOfficialAnnouncementsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: AnnouncementsRes, ...getAnnouncementsState } =
    useGetOfficialAnnouncementsQuery({
      search: search,
      limit,
      page,
    });

  const AnnouncementsData = AnnouncementsRes?.data?.items;
  const AnnouncementsPagination = AnnouncementsRes?.data?.meta;
  return (
    <DefaultTable
      data={AnnouncementsData}
      columns={columns}
      className="text-default-100"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full ">
          <div className="flex-1">
            <DropDownMenu />
          </div>
          <div className="flex-none w-64 text-end">
            <SearchComponent placeholder="Search" className="h-12" />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={AnnouncementsData}
        {...getAnnouncementsState}
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
      </RenderData>
    </DefaultTable>
  );
}
