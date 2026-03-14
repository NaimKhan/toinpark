import { getSeoMeta } from "@/lib/getSeoMeta";
import { Suspense } from "react";
import GeneralSettings from "./components/GeneralSettings";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "General Settings" });

export default function GeneralSettingsPage() {
  return (
    <Suspense>
      <div>
        <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
          <GradientText
            label="General Settings"
            className="text-xl font-semibold whitespace-nowrap"
          />
        </div>

        <div className="p-6">
          <GeneralSettings />
        </div>
      </div>
    </Suspense>
  );
}
