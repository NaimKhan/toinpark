import { getSeoMeta } from "@/lib/getSeoMeta";
import GradientText from "@/components/feature/text/gradientText";
import SettingItemCards from "./components/SettingItemCards";

export const metadata = getSeoMeta({ title: "User Settings" });

export default function Settings() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 mx-auto">
      <div className="overflow-visible bg-card">
        <div className="mb-6 md:mb-8">
          <GradientText
            label="SETTINGS"
            className="text-xl font-semibold whitespace-nowrap"
          />
          <p className="text-default-200 text-base mt-2">
            Manage your account settings and preferences.
          </p>
        </div>
        <SettingItemCards />
      </div>
    </div>
  );
}
