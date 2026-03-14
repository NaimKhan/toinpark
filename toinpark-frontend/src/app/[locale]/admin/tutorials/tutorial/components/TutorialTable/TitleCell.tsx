import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import { CellContext } from "@tanstack/react-table";
import VideoModal from "@/components/feature/video-player";
import Image from "next/image";
import { getFallbackImage } from "@/lib/media/getFallbackImage";

export default function TitleCell({
  row: { original },
}: CellContext<TTutorialData, unknown>) {
  const title = original.title;
  const videoUrl =
    original?.type === "link"
      ? original?.sourceLink || ""
      : original?.videoMedia?.url || "";

  return (
    <div className="flex items-center gap-2 min-w-[280px]">
      <VideoModal
        url={videoUrl}
        title={title}
        triggerContent={
          <div className="w-32 h-24 rounded-md border overflow-hidden">
            <Image
              alt="Tutorial Thumbnail"
              src={getFallbackImage({ src: original?.thumbnailMedia?.url })}
              fill
              className="rounded-md object-cover"
            />
          </div>
        }
      />

      <p className="font-semibold text-default-100 truncate line-clamp-3 min-w-[150px] max-w-[300px]">
        {title}
      </p>
    </div>
  );
}
