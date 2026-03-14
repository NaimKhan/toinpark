import { getSeoMeta } from "@/lib/getSeoMeta";
import EditProfileClient from "./EditProfileClient";

export const metadata = getSeoMeta({ title: "Edit Profile" });

export default function EditProfile() {
  return <EditProfileClient />;
}
