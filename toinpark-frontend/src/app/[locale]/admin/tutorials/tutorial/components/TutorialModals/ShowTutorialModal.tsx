"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetATutorialQuery } from "@/store/api/tutorials/tutorials-api";
import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import VideoModal from "@/components/feature/video-player";
import Image from "next/image";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import ContentLoader from "@/components/feature/loader/ContentLoader";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export default function ShowTutorialModal({ id }: { id: TString }) {
  const [open, setOpen] = useState(false);

  const { data: res, ...apiState } = useGetATutorialQuery(
    { id },
    { skip: !open },
  );

  const tutorial = res?.data;

  return (
    <>
      <CommonTooltip content="View">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <EyeIcon />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Tutorial Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[625px] h-fit"
      >
        <RenderData
          expectedDataType="object"
          data={tutorial}
          {...apiState}
          loadingSkeleton={<ContentLoader />}
        >
          <ScrollArea className="max-h-[65vh] pr-2">
            <div className="space-y-4">
              {/* Title */}
              <InfoCard label="Title" value={tutorial?.title} />

              {/* Video */}
              {tutorial?.filePath ? (
                <div className="rounded-lg overflow-hidden shadow border">
                  <VideoModal
                    url={tutorial?.videoMedia?.url || ""}
                    title={tutorial.title}
                    errorMessage={
                      tutorial?.videoMedia?.url ? "" : "Video not found"
                    }
                    triggerContent={
                      <div className="relative w-full h-52 border">
                        <Image
                          alt="Tutorial Thumbnail"
                          src={getFallbackImage({
                            src: tutorial?.thumbnailMedia?.url,
                          })}
                          fill
                          className="object-cover"
                        />
                      </div>
                    }
                  />
                </div>
              ) : (
                <>
                  {/* Source Link */}
                  <InfoCard
                    label="Source Link"
                    value={
                      <Link
                        href={tutorial?.sourceLink || "#"}
                        target="_blank"
                        className="hover:text-primary underline transition break-all line-clamp-2 hover:line-clamp-none"
                      >
                        {tutorial?.sourceLink || "N/A"}
                      </Link>
                    }
                  />
                </>
              )}

              {/* Type + Category */}
              <div className="grid grid-cols-2 gap-3">
                <InfoCard
                  label="Type"
                  value={tutorial?.type}
                  className="h-full"
                />
                <InfoCard
                  label="Category"
                  value={tutorial?.category?.name}
                  className="h-full"
                />
              </div>

              {/* Description */}
              {tutorial?.description && (
                <InfoCard
                  label="Description"
                  value={
                    <p className="whitespace-pre-line">
                      {tutorial?.description}
                    </p>
                  }
                />
              )}

              {/* Featured - Moved to Bottom */}
              <div className="grid grid-cols-2 gap-3">
                <InfoCard
                  label="Created At"
                  value={
                    <span className={`font-semibold text-default-100`}>
                      {convertUTCToLocal({
                        utcDateTime: tutorial?.createdAt,
                      }) || "-"}
                    </span>
                  }
                />
                <InfoCard
                  label="Featured"
                  value={
                    <span
                      className={`font-semibold ${
                        tutorial?.isFeatured
                          ? "text-success/80"
                          : "text-destructive/80"
                      }`}
                    >
                      {tutorial?.isFeatured ? "Active" : "Inactive"}
                    </span>
                  }
                />
              </div>
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
