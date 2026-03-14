import { getSeoMeta } from "@/lib/getSeoMeta";
import AdminNotificationsClient from "./NotificationsClient";

export const metadata = getSeoMeta({ title: "Notifications" });

export default function AdminNotificationsPage() {
  return <AdminNotificationsClient />;
}
