"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetSubAdminsArgs } from "@/store/api/sub-admin-management/sub-admin-management.types";
import { useGetSubAdminsQuery } from "@/store/api/sub-admin-management/sub-admin-management-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/feature/loader/RenderData";

function SubAdminManagementTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetSubAdminsArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: getSubAdminsRes, ...getSubAdminsApiState } =
    useGetSubAdminsQuery({
      search: search,
      limit,
      page,
    });
  const subAdminsData = getSubAdminsRes?.data?.items;
  const subAdminsPagination = getSubAdminsRes?.data?.meta;
  return (
    <>
      <DefaultTable
        data={subAdminsData}
        columns={columns}
        className="text-default-100 border-none"
      >
        <DefaultTable.TitleContainer>
          <div className="flex flex-wrap justify-between gap-4 items-center w-full">
            <div className="flex-1">
              <DropDownMenu />
            </div>
            <div className="flex-none w-64 text-end">
              <SearchComponent className="h-10" />
            </div>
          </div>
        </DefaultTable.TitleContainer>
        <RenderData
          expectedDataType="array"
          data={subAdminsData}
          {...getSubAdminsApiState}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getSubAdminsApiState.isLoading ||
                getSubAdminsApiState?.isFetching
              }
              totalPages={subAdminsPagination?.totalPages}
              hasNext={subAdminsPagination?.hasNext}
              hasPrevious={subAdminsPagination?.hasPrevious}
            />
          </DefaultTable.Footer>
        </RenderData>
      </DefaultTable>
    </>
  );
}

export default SubAdminManagementTable;
