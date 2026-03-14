"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import { useGetCommunityEventsQuery } from "@/store/api/community-events/community-events-api";
import { TGetCommunityEventsArgs } from "@/store/api/community-events/community-events.types";

export default function CommunityEventsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetCommunityEventsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: CommunityEventsRes, ...getCommunityEventsState } =
    useGetCommunityEventsQuery({
      search: search,
      limit,
      page,
    });
  const CommunityEventsData = CommunityEventsRes?.data?.items;
  const CommunityEventsPagination = CommunityEventsRes?.data?.meta;

  return (
    <DefaultTable
      data={CommunityEventsData}
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
        data={CommunityEventsData}
        {...getCommunityEventsState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getCommunityEventsState.isLoading ||
              getCommunityEventsState?.isFetching
            }
            totalPages={CommunityEventsPagination?.totalPages}
            hasNext={CommunityEventsPagination?.hasNext}
            hasPrevious={CommunityEventsPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
