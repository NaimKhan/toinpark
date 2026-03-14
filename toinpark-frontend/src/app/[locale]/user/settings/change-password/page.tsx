import { getSeoMeta } from "@/lib/getSeoMeta";
import ChangePasswordClient from "./ChangePasswordClient";

export const metadata = getSeoMeta({ title: "Change Password" });

export default function ChangePassword() {
  return <ChangePasswordClient />;
}
