import CopyButton from "@/components/feature/buttons/CopyButton";
import Calendar from "@/components/svg/Calendar";
import Clock from "@/components/svg/Clock";
import MapPin from "@/components/svg/MapPin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TCommunityEvent } from "@/store/api/community-events/community-events.types";
import Image from "next/image";
import Link from "next/link";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

function CommunityEventCard({
  communityEvent,
}: {
  communityEvent: TCommunityEvent;
}) {
  const isValidDate =
    (communityEvent?.eventDate &&
      convertUTCToLocal({
        utcDateTime: communityEvent.eventDate,
        format: "DD MMMM YYYY",
      })) ||
    "-";
  const formattedDate = isValidDate
    ? convertUTCToLocal({
        utcDateTime: communityEvent.eventDate,
      }) || "-"
    : "00/00/0000";

  const formattedTime = isValidDate
    ? convertUTCToLocal({
        utcDateTime: communityEvent.eventDate,
        format: "HH:mm",
      }) || "00:00"
    : "00:00";

  return (
    <Card className="overflow-hidden bg-secondary-background text-default-100">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative w-full h-54 flex-none">
          <Image
            src={communityEvent?.media?.url ?? "/images/all/cardImage.jpg"}
            alt={communityEvent?.title ?? "Event Image"}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-5 space-y-7 flex-1">
          <div>
            {communityEvent.title && (
              <h3
                className="text-2xl font-semibold line-clamp-1"
                title={communityEvent.title}
              >
                <Link href={`community-events/${communityEvent.id}`}>
                  {communityEvent.title}
                </Link>
              </h3>
            )}

            {communityEvent?.description && (
              <p
                className="text-default-200 text-lg mt-3 line-clamp-2"
                title={communityEvent.description}
              >
                {communityEvent.description}
              </p>
            )}
          </div>
        </div>
        {/* Buttons */}
        <Separator className="bg-input" />
        <div className="flex-none  px-5 pb-5 pt-5 space-y-5">
          {/* Date, Time, Location */}
          <div className="space-y-5 text-base text-default-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                <span>{formattedTime}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-1">
              <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
              <span className="leading-snug">
                {communityEvent?.eventLocation || "_"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            {communityEvent?.eventLink ? (
              <Button
                className="flex-1"
                disabled={!communityEvent?.eventLink}
                asChild
              >
                <Link
                  href={communityEvent?.eventLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Event
                </Link>
              </Button>
            ) : (
              <Button className="flex-1" disabled={true}>
                Join Event
              </Button>
            )}

            <CopyButton
              text={communityEvent?.eventLink || ""}
              className="h-12 flex-1 border text-default-100 bg-transparent hover:bg-border"
              disabled={!communityEvent?.eventLink}
            >
              Copy Link
            </CopyButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommunityEventCard;
