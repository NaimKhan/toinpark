"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import RenderData from "@/components/feature/loader/RenderData";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetTicketsCategoriesArgs } from "@/store/api/tickets-categories/tickets-categories.types";
import { useGetTicketsCategoriesQuery } from "@/store/api/tickets-categories/tickets-categories-api";
import BasicPagination from "@/components/pagination/basic-pagination";

export default function TicketCategoryTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetTicketsCategoriesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getTicketsCategoryRes, ...getTicketsCategoryApiState } =
    useGetTicketsCategoriesQuery({
      search: search,
      limit,
      page,
    });
  const ticketsCategoryData = getTicketsCategoryRes?.data?.items;
  const ticketsCategoryPagination = getTicketsCategoryRes?.data?.meta;
  return (
    <>
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <DefaultTable
          data={ticketsCategoryData}
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
            data={ticketsCategoryData}
            {...getTicketsCategoryApiState}
          >
            <DefaultTable.Table />
            <DefaultTable.Footer>
              <BasicPagination
                isLoading={
                  getTicketsCategoryApiState.isLoading ||
                  getTicketsCategoryApiState?.isFetching
                }
                totalPages={ticketsCategoryPagination?.totalPages}
                hasNext={ticketsCategoryPagination?.hasNext}
                hasPrevious={ticketsCategoryPagination?.hasPrevious}
              />
            </DefaultTable.Footer>
          </RenderData>
        </DefaultTable>
      </div>
    </>
  );
}
