import { getSeoMeta } from "@/lib/getSeoMeta";
import ProfileSettingsClient from "./ProfileSettingsClient";

export const metadata = getSeoMeta({ title: "Profile Settings" });

export default function ProfilePage() {
  return <ProfileSettingsClient />;
}
