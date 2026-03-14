"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TString } from "@/store/api/common-api-types";
import PlayIcon from "@/components/svg/PlayIcon";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";

interface VideoModalProps {
  url: string;
  title?: TString;
  tutorialsData?: TTutorialData;
  triggerContent: React.ReactNode;
  errorMessage?: string;
}

export default function VideoModal({
  url,
  title,
  tutorialsData,
  triggerContent,
  errorMessage = "Unable to play this video. Please check the video source.",
}: VideoModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative cursor-pointer overflow-hidden rounded-lg"
      >
        {triggerContent}
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 hover:bg-background/40 transition cursor-pointer">
          <PlayIcon className="w-16 h-16 text-default-100 backdrop-blur-sm hover:scale-110 transition" />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:max-w-3xl 3xl:max-w-5xl md:min-w-2xl h-fit bg-secondary-background p-0 overflow-hidden gap-0 overflow-hidden">
          <div className="aspect-video w-full h-full flex items-center justify-center overflow-hidden">
            {error ? (
              <div className="text-destructive text-center p-6">
                <p className="text-xl font-semibold">Failed to load video</p>
                <p className="text-md opacity-80 mt-2">{error}</p>
              </div>
            ) : (
              <ReactPlayer
                src={url}
                width="100%"
                height="100%"
                playing
                controls
                onError={(err) => {
                  console.error("ReactPlayer Error:", err);
                  setError(errorMessage);
                }}
              />
            )}
          </div>
          <ScrollArea className="max-h-[50vh] lg:max-h-[40vh]">
            <DialogHeader className="bg-secondary-background">
              {(title || tutorialsData?.title) && (
                <DialogTitle className="text-start text-lg">
                  {title || tutorialsData?.title}
                </DialogTitle>
              )}
            </DialogHeader>
            {tutorialsData?.category && (
              <div className="flex flex-wrap items-center gap-2 mx-4 mb-4">
                <span className="text-default-400 text-sm whitespace-nowrap">
                  Published{" "}
                  {dayjs(tutorialsData.createdAt).format("MMM DD, YYYY")}
                </span>
                <span className="text-default-400">|</span>

                <span className="inline-flex items-center rounded-full bg-muted text-white px-3 py-1 text-xs font-semibold uppercase max-w-[200px] sm:max-w-none truncate">
                  {tutorialsData.category.name}
                </span>
              </div>
            )}
            {tutorialsData?.description && (
              <DialogDescription className="text-default-200 text-base px-4 pb-4 font-semibold leading-relaxed break-words whitespace-pre-wrap">
                {tutorialsData?.description}
              </DialogDescription>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
