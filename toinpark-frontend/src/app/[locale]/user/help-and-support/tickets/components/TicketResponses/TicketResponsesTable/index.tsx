"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import { useGetMyTicketsQuery } from "@/store/api/tickets/tickets-api";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetMyTicketsArgs } from "@/store/api/tickets/tickets.types";
import RenderData from "@/components/feature/loader/RenderData";
import Loader from "@/components/feature/loader/loader";
import BasicPagination from "@/components/pagination/basic-pagination";

function TicketResponsesTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMyTicketsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: MyTicketsRes, ...getMyTicketsApiState } = useGetMyTicketsQuery({
    search: search,
    limit,
    page,
  });
  const MyTicketsData = MyTicketsRes?.data?.items;
  const MyTicketsPagination = MyTicketsRes?.data?.meta;
  return (
    <RenderData
      expectedDataType="array"
      data={MyTicketsData}
      {...getMyTicketsApiState}
      loadingSkeleton={<Loader />}
    >
      <DefaultTable data={MyTicketsData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getMyTicketsApiState.isLoading || getMyTicketsApiState?.isFetching
            }
            totalPages={MyTicketsPagination?.totalPages}
            hasNext={MyTicketsPagination?.hasNext}
            hasPrevious={MyTicketsPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default TicketResponsesTable;
