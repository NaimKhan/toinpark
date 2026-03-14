"use client";

import { useGetACommunityEventQuery } from "@/store/api/community-events/community-events-api";
import { Separator } from "@/components/ui/separator";
import RenderData from "@/components/feature/loader/RenderData";
import Image from "next/image";
import Calendar from "@/components/svg/Calendar";
import Clock from "@/components/svg/Clock";
import MapPin from "@/components/svg/MapPin";
import { renderURL } from "@/lib/url/renderURL";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export default function ShowCommunityEvent({ eventId }: { eventId: string }) {
  const { data: res, ...apiState } = useGetACommunityEventQuery({
    id: eventId,
  });

  const communityEvent = res?.data;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="px-6 py-10 xl:px-16 md:px-12 space-y-10">
        <RenderData
          expectedDataType="object"
          data={communityEvent}
          {...apiState}
        >
          <div className="space-y-10 max-w-[1000px]">
            <div className="flex flex-col flex-wrap gap-10">
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={
                    communityEvent?.media?.url ?? "/images/all/cardImage.jpg"
                  }
                  alt={communityEvent?.title ?? "Event Image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  {communityEvent?.title && (
                    <h3 className="text-3xl font-semibold tracking-tight">
                      {communityEvent?.title || "Event Title"}
                    </h3>
                  )}

                  {communityEvent?.description && (
                    <p className="text-default-200 text-base mt-3 leading-relaxed">
                      {communityEvent.description || "Event Description"}
                    </p>
                  )}
                </div>
                <Separator className="bg-border" />
                <div className="space-y-5 text-default-200 text-sm md:text-base">
                  {/* Date + Time */}
                  {communityEvent?.eventDate && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                      <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg border border-border">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-medium">
                          {convertUTCToLocal({
                            utcDateTime: communityEvent.eventDate,
                            format: "HH:mm",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg border border-border">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">
                          {convertUTCToLocal({
                            utcDateTime: communityEvent.eventDate,
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Event Location */}
                  {communityEvent?.eventLocation && (
                    <div className="flex items-center gap-2 bg-card/50 px-3 py-2 rounded-lg border border-border w-fit">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {communityEvent.eventLocation || "Event Location"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-4 pt-4">
                  {/* Event Link */}
                  <div className="flex flex-col">
                    <span className="text-default-100 text-xl mb-1 font-medium">
                      Event Link
                    </span>

                    {communityEvent?.eventLink ? (
                      <a
                        href={renderURL(communityEvent.eventLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80 break-all"
                      >
                        {communityEvent.eventLink}
                      </a>
                    ) : (
                      <span className="text-default-500 bg-card/40 px-3 py-2 rounded-md border border-border cursor-not-allowed">
                        No Event Link Available
                      </span>
                    )}
                  </div>

                  {/* Map Link */}
                  <div className="flex flex-col">
                    <span className="text-default-100 text-xl mb-1 font-medium">
                      Map Link
                    </span>

                    {communityEvent?.mapLink ? (
                      <a
                        href={renderURL(communityEvent.mapLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80 break-all"
                      >
                        {communityEvent.mapLink}
                      </a>
                    ) : (
                      <span className="text-default-500 bg-card/40 px-3 py-2 rounded-md border border-border cursor-not-allowed">
                        No Map Link Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RenderData>
      </div>
    </div>
  );
}
