"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetAirdropEventsArgs } from "@/store/api/airdrop-events/airdrop-events.type";
import { useGetAirdropEventsQuery } from "@/store/api/airdrop-events/airdrop-events-api";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

export default function AirdropEventsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAirdropEventsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getAirdropEventsRes, ...getAirdropEventsApiState } =
    useGetAirdropEventsQuery({ search: search, limit, page });
  const airdropEventData = getAirdropEventsRes?.data?.items;
  const airdropEventPagination = getAirdropEventsRes?.data?.meta;
  return (
    <div>
      <DefaultTable
        data={airdropEventData}
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
          data={airdropEventData}
          {...getAirdropEventsApiState}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getAirdropEventsApiState.isLoading ||
                getAirdropEventsApiState?.isFetching
              }
              totalPages={airdropEventPagination?.totalPages}
              hasNext={airdropEventPagination?.hasNext}
              hasPrevious={airdropEventPagination?.hasPrevious}
            />
          </DefaultTable.Footer>
        </RenderData>
      </DefaultTable>
    </div>
  );
}
