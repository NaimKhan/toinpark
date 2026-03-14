"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import { TGetTicketsArgs } from "@/store/api/tickets/tickets.types";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetTicketsQuery } from "@/store/api/tickets/tickets-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/feature/loader/RenderData";

function TicketManagementTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetTicketsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getTicketsRes, ...getTicketsApiState } = useGetTicketsQuery({
    search: search,
    limit,
    page,
  });
  const ticketsData = getTicketsRes?.data?.items;
  const ticketsPagination = getTicketsRes?.data?.meta;
  return (
    <>
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <DefaultTable
          data={ticketsData}
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
            data={ticketsData}
            {...getTicketsApiState}
          >
            <DefaultTable.Table />
            <DefaultTable.Footer>
              <BasicPagination
                isLoading={
                  getTicketsApiState.isLoading || getTicketsApiState?.isFetching
                }
                totalPages={ticketsPagination?.totalPages}
                hasNext={ticketsPagination?.hasNext}
                hasPrevious={ticketsPagination?.hasPrevious}
              />
            </DefaultTable.Footer>
          </RenderData>
        </DefaultTable>
      </div>
    </>
  );
}

export default TicketManagementTable;
