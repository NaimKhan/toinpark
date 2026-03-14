import { getSeoMeta } from "@/lib/getSeoMeta";
import UserNotificationsClient from "./NotificationsClient";

export const metadata = getSeoMeta({ title: "Notifications" });

export default function UserNotificationsPage() {
  return <UserNotificationsClient />;
}
