"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import BasicPagination from "@/components/pagination/basic-pagination";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import RenderData from "@/components/feature/loader/RenderData";
import ContentLoader from "@/components/feature/loader/ContentLoader";
import { useGetReferralLevelMembersQuery } from "@/store/api/referral-levels/referral-levels-api";
import { useGetLoggedInUser } from "@/hooks/feature/useGetLoggedInUser";

function MyTeamTable({ levelId }: { levelId: string }) {
  const { getAllParamValue } = useManageSearchParams();
  const { getUser } = useGetLoggedInUser();
  const { page, limit = 10 } = getAllParamValue() as {
    page: number;
    limit: number;
  };

  const { data: getLevelMemberRes, ...getLevelMemberApiState } =
    useGetReferralLevelMembersQuery(
      {
        levelId: levelId,
        userId: getUser?.userId as string,
        page,
        limit,
      },
      { skip: !getUser?.userId || !levelId },
    );

  const levelMemberData = getLevelMemberRes?.data?.items;
  const levelMemberPagination = getLevelMemberRes?.data?.meta;

  return (
    <DefaultTable
      className="rounded-none"
      data={levelMemberData}
      columns={columns}
    >
      <RenderData
        expectedDataType="array"
        data={levelMemberData}
        {...getLevelMemberApiState}
        loadingSkeleton={<ContentLoader />}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getLevelMemberApiState.isLoading ||
              getLevelMemberApiState?.isFetching
            }
            totalPages={levelMemberPagination?.totalPages}
            hasNext={levelMemberPagination?.hasNext}
            hasPrevious={levelMemberPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default MyTeamTable;
