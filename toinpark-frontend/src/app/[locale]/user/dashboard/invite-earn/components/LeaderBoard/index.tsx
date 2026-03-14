"use client";

import RenderData from "@/components/feature/loader/RenderData";
import BoardItem from "./BoardItem";
import GradientText from "@/components/feature/text/gradientText";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetToinLeaderBoardQuery } from "@/store/api/leader-board/leader-board-api";
import { TGetToinLeaderBoardArgs } from "@/store/api/leader-board/leader-board.type";

function LeaderBoard() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetToinLeaderBoardArgs, void>>();
  const { search, limit = 15, page } = getAllParamValue();
  const { data: leaderboardRes, ...getLeaderboardState } =
    useGetToinLeaderBoardQuery({
      search,
      limit,
      page,
    });
  const leaderboardItems = leaderboardRes?.data?.items;

  return (
    <div className="px-6 py-6 xl:px-16 md:px-10 md:py-12 ">
      <div className="w-full space-y-6 md:space-y-10">
        <div>
          <GradientText
            label="Leaderboard"
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium"
          />
          <p className="text-lg text-default-200">
            {"See who's leading the pack with the most TOINS earned!"}
          </p>
        </div>

        <RenderData
          expectedDataType="array"
          data={leaderboardItems}
          showEmptyState={true}
          {...getLeaderboardState}
          dataNotFoundTitle="No Leaderboard Data"
          dataNotFoundSubtitle="No leaderboard data available yet."
        >
          <div className="border rounded-sm  max-w-1/2">
            {leaderboardItems?.map((item, i) => (
              <BoardItem key={item.userId || i} user={item} />
            ))}
          </div>
        </RenderData>
      </div>
    </div>
  );
}

export default LeaderBoard;
