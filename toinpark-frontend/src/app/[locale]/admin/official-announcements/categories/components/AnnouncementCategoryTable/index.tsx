"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import { useGetAnnouncementCategoriesQuery } from "@/store/api/announcement-categories/announcement-categories-api";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetAnnouncementCategoriesArgs } from "@/store/api/announcement-categories/announcement-categories.types";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";

export default function AnnouncementCategoriesTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnnouncementCategoriesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: AnnouncementCategoriesRes, ...getAnnouncementCategoriesState } =
    useGetAnnouncementCategoriesQuery({
      search: search,
      limit,
      page,
    });

  const CategoriesData = AnnouncementCategoriesRes?.data?.items;
  const CategoriesPagination = AnnouncementCategoriesRes?.data?.meta;

  return (
    <div>
      <DefaultTable
        data={CategoriesData}
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
          data={CategoriesData}
          {...getAnnouncementCategoriesState}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getAnnouncementCategoriesState.isLoading ||
                getAnnouncementCategoriesState?.isFetching
              }
              totalPages={CategoriesPagination?.totalPages}
              hasNext={CategoriesPagination?.hasNext}
              hasPrevious={CategoriesPagination?.hasPrevious}
            />
          </DefaultTable.Footer>
        </RenderData>
      </DefaultTable>
    </div>
  );
}
