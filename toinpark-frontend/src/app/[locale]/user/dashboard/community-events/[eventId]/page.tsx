import { getSeoMeta } from "@/lib/getSeoMeta";
import ShowCommunityEvent from "./view";

export const metadata = getSeoMeta({
  title: "Event Details",
});

export default async function CommunityEventsDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;

  return <ShowCommunityEvent eventId={eventId} />;
}
