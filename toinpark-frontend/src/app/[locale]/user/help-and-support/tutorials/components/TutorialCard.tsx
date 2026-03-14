"use client";
import VideoModal from "@/components/feature/video-player";
import { Card, CardContent } from "@/components/ui/card";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import Image from "next/image";

interface TutorialCardProps {
  tutorialsData?: TTutorialData;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorialsData }) => {
  return (
    <Card className="bg-transparent border-0 overflow-hidden ">
      <VideoModal
        url={
          tutorialsData?.type === "link"
            ? tutorialsData?.sourceLink || ""
            : tutorialsData?.videoMedia?.url || ""
        }
        tutorialsData={tutorialsData}
        triggerContent={
          <Image
            src={getFallbackImage({ src: tutorialsData?.thumbnailMedia?.url })}
            alt="Thumbnail"
            width={472}
            height={266}
            className="object-cover w-full h-full aspect-video rounded-lg overflow-hidden"
          />
        }
      />

      <CardContent className="p-0 mt-5">
        <h3 className="text-default-100 font-semibold text-xl line-clamp-1 truncate">
          {tutorialsData?.title}
        </h3>

        <p className="text-default-200 text-base mt-1 line-clamp-2 font-semibold leading-relaxed break-words whitespace-pre-wrap">
          {tutorialsData?.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default TutorialCard;
