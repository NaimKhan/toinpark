"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TGetReferralMilestonesArgs } from "@/store/api/referral-milestone/referral-milestone.type";
import RenderData from "@/components/feature/loader/RenderData";
import BasicPagination from "@/components/pagination/basic-pagination";
import { useGetReferralMilestonesQuery } from "@/store/api/referral-milestone/referral-milestone-api";

function ReferralMilestoneTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetReferralMilestonesArgs, void>>();
  const { search, limit = 10, page } = getAllParamValue();
  const { data: referralMilestoneRes, ...getReferralMilestoneApiState } =
    useGetReferralMilestonesQuery({ search: search, limit, page });
  const referralMilestoneData = referralMilestoneRes?.data?.items;
  const referralMilestonePagination = referralMilestoneRes?.data?.meta;
  return (
    <DefaultTable
      data={referralMilestoneData}
      columns={columns}
      className="text-default-100 border-none"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full">
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
        data={referralMilestoneData}
        {...getReferralMilestoneApiState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getReferralMilestoneApiState.isLoading ||
              getReferralMilestoneApiState?.isFetching
            }
            totalPages={referralMilestonePagination?.totalPages}
            hasNext={referralMilestonePagination?.hasNext}
            hasPrevious={referralMilestonePagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default ReferralMilestoneTable;
