import Profile from "./components/Profile";
import { getSeoMeta } from "@/lib/getSeoMeta";

export const metadata = getSeoMeta({ title: "Profile" });

export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen text-default-100">
      <Profile />
    </div>
  );
}
