"use client";

import CommunityEventCard from "./CommunityEventCard";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetCommunityEventsArgs } from "@/store/api/community-events/community-events.types";
import { useGetFeaturedCommunityEventsQuery } from "@/store/api/community-events/community-events-api";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

function CommunityEventList() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetCommunityEventsArgs, void>>();
  const { search, limit = 9, page } = getAllParamValue();
  const { data: getCommunityEventsRes, ...getCommunityEventsState } =
    useGetFeaturedCommunityEventsQuery({
      search: search,
      limit,
      page,
    });
  const getCommunityEventsData = getCommunityEventsRes?.data?.items ?? [];
  const CommunityEventsPagination = getCommunityEventsRes?.data?.meta;

  return (
    <RenderData
      expectedDataType="array"
      data={getCommunityEventsData}
      showEmptyState={true}
      {...getCommunityEventsState}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
        {getCommunityEventsData.map((communityEvent) => (
          <CommunityEventCard
            key={communityEvent.id}
            communityEvent={communityEvent}
          />
        ))}
      </div>
      <BasicPagination
        isLoading={
          getCommunityEventsState.isLoading ||
          getCommunityEventsState?.isFetching
        }
        totalPages={CommunityEventsPagination?.totalPages}
        hasNext={CommunityEventsPagination?.hasNext}
        hasPrevious={CommunityEventsPagination?.hasPrevious}
      />
    </RenderData>
  );
}

export default CommunityEventList;
