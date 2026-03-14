"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetTutorialsArgs } from "@/store/api/tutorials/tutorials.types";
import { useGetTutorialsQuery } from "@/store/api/tutorials/tutorials-api";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

function TutorialTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetTutorialsArgs, void>>();
  const { search, limit, page } = getAllParamValue();
  const { data: getTutorialsRes, ...getTutorialsApiState } =
    useGetTutorialsQuery({
      search,
      limit,
      page,
    });
  const tutorialsData = getTutorialsRes?.data?.items;
  const tutorialsPagination = getTutorialsRes?.data?.meta;
  return (
    <div>
      <DefaultTable
        data={tutorialsData}
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
          data={tutorialsData}
          {...getTutorialsApiState}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getTutorialsApiState.isLoading ||
                getTutorialsApiState?.isFetching
              }
              totalPages={tutorialsPagination?.totalPages}
              hasNext={tutorialsPagination?.hasNext}
              hasPrevious={tutorialsPagination?.hasPrevious}
            />
          </DefaultTable.Footer>
        </RenderData>
      </DefaultTable>
    </div>
  );
}

export default TutorialTable;
