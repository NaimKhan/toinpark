import Image from "next/image";
import { type TLeaderboardItem } from "@/store/api/leader-board/leader-board.type";
import { getFallbackImage } from "@/lib/media/getFallbackImage";

function BoardItem({ user }: { user: TLeaderboardItem }) {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const displayName = fullName || "Anonymous User";

  return (
    <div className="flex items-center justify-between px-6 py-5  border-b last:border-b-0 hover:bg-neutral-900 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500 flex items-center justify-center text-white">
          <Image
            src={getFallbackImage({
              src: user.media?.url,
              fallbackImageSize: 100,
              avatar: true,
            })}
            alt={displayName}
            width={32}
            height={32}
            className=" object-cover"
          />
        </div>
        <span className="text-base">{displayName}</span>
      </div>
      <span className="text-base text-default-200">{user.totalToin} TOINS</span>
    </div>
  );
}

export default BoardItem;
