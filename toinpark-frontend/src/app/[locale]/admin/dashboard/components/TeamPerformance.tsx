"use client";

import Image from "next/image";
import RenderData from "@/components/feature/loader/RenderData";
import { useGetToinLeaderBoardQuery } from "@/store/api/leader-board/leader-board-api";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import { TLeaderboardItem } from "@/store/api/leader-board/leader-board.type";

function BoardItem({ user }: { user: TLeaderboardItem }) {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const displayName = fullName || "Anonymous User";

  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 last:border-b-0 hover:bg-secondary/20 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center text-white">
          <Image
            src={getFallbackImage({
              src: user.media?.url,
              fallbackImageSize: 100,
              avatar: true,
            })}
            alt={displayName}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <span className="text-base font-medium text-default-100">
          {displayName}
        </span>
      </div>
      <span className="text-base font-semibold text-primary">
        {user.totalToin} TOINS
      </span>
    </div>
  );
}

export default function TeamPerformance() {
  const { data: leaderboardRes, ...apiState } = useGetToinLeaderBoardQuery({
    limit: 10,
    page: 1,
  });
  const leaderboardItems = leaderboardRes?.data?.items || [];

  return (
    <div className="w-full">
      <div className="mb-6 px-1">
        <h3 className="text-xl font-semibold">Leaderboard</h3>
        <p className="text-sm text-default-300 mt-1">
          Top performing members by TOINS earned
        </p>
      </div>

      <RenderData
        expectedDataType="array"
        data={leaderboardItems}
        showEmptyState={true}
        {...apiState}
        dataNotFoundTitle="No Leaderboard Data"
        dataNotFoundSubtitle="No leaderboard data available yet."
      >
        <div className="border border-border/50 rounded-lg overflow-hidden bg-secondary/10">
          {leaderboardItems.map((item, i) => (
            <BoardItem key={item.userId || i} user={item} />
          ))}
        </div>
      </RenderData>
    </div>
  );
}
