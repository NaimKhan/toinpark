"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import { useGetACommunityEventQuery } from "@/store/api/community-events/community-events-api";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import Link from "next/link";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import Image from "next/image";
import ContentLoader from "@/components/feature/loader/ContentLoader";

const ensureProtocol = (link: string | null | undefined) => {
  if (!link) return "";
  if (link.startsWith("http://") || link.startsWith("https://")) return link;
  return `https://${link}`;
};

export default function ShowCommunityEventModal({
  eventId,
}: {
  eventId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: res, ...apiState } = useGetACommunityEventQuery(
    { id: eventId },
    {
      skip: !open,
    },
  );

  const communityEvent = res?.data;

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
        title="Community Event Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[625px]"
      >
        <RenderData
          expectedDataType="object"
          data={communityEvent}
          {...apiState}
          loadingSkeleton={<ContentLoader />}
        >
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="space-y-4">
              <InfoCard label="Title" value={communityEvent?.title || "—"} />

              {communityEvent?.eventType && (
                <InfoCard
                  label="Event Type"
                  value={communityEvent?.eventType || "—"}
                />
              )}
              {communityEvent?.eventDate && (
                <InfoCard
                  label="Event Date"
                  value={convertUTCToLocal({
                    utcDateTime: communityEvent.eventDate,
                  })}
                />
              )}
              {communityEvent?.eventLink && (
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 shadow-sm transition-all hover:bg-card">
                  <div className="text-lg font-medium tracking-wide text-muted-foreground mb-2">
                    Event Link
                  </div>

                  <Link
                    href={ensureProtocol(communityEvent?.eventLink)}
                    className="text-sm font-semibold text-primary underline leading-relaxed break-words"
                  >
                    {communityEvent?.eventLink ?? "—"}
                  </Link>
                </div>
              )}
              {communityEvent?.mapLink && (
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 shadow-sm transition-all hover:bg-card">
                  <div className="text-lg font-medium tracking-wide text-muted-foreground mb-2">
                    Map Link
                  </div>

                  <Link
                    href={ensureProtocol(communityEvent?.mapLink)}
                    className="text-sm font-semibold text-primary underline leading-relaxed break-words"
                  >
                    {communityEvent?.mapLink ?? "—"}
                  </Link>
                </div>
              )}
              {communityEvent?.eventLocation && (
                <InfoCard
                  label="Event Location"
                  value={communityEvent?.eventLocation || "—"}
                />
              )}

              <InfoCard
                label="Description"
                value={
                  <p className="whitespace-pre-line">
                    {communityEvent?.description || "—"}
                  </p>
                }
              />
              <InfoCard
                label="Featured"
                value={
                  <span
                    className={`font-semibold ${
                      communityEvent?.isActive
                        ? "text-success/80"
                        : "text-destructive/80"
                    }`}
                  >
                    {communityEvent?.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />

              {communityEvent?.media?.url && (
                <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 shadow-sm transition-all hover:bg-card">
                  <p className="text-lg font-medium text-default-100">
                    Event Image
                  </p>

                  <Image
                    width={100}
                    height={100}
                    sizes="100vw,100vh"
                    src={communityEvent.media.url || ""}
                    alt="Event Banner"
                    className="max-h-[200px] object-cover rounded-md mt-2 w-fit"
                  />
                </div>
              )}
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
