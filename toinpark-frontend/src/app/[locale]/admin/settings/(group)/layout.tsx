import SettingsSidebar from "./SettingsSidebar";
import GradientText from "@/components/feature/text/gradientText";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 mx-auto">
      <div className="bg-card relative">
        {/* LEFT SIDEBAR — DEFAULT (mobile/tablet) */}
        <div className="xl:hidden col-span-12 bg-border/50 rounded-lg mb-6">
          <GradientText
            label="Quick navigation"
            className="text-xl font-semibold whitespace-nowrap p-4"
          />
          <div className="p-3">
            <SettingsSidebar />
          </div>
        </div>

        {/* LEFT SIDEBAR — FIXED (desktop only) */}
        <div className="hidden xl:block">
          <div className="fixed top-32 w-[260px] bg-border/50 rounded-lg z-50">
            <GradientText
              label="Quick navigation"
              className="text-xl font-semibold whitespace-nowrap p-4"
            />
            <div className="p-3">
              <SettingsSidebar />
            </div>
          </div>
        </div>

        <div className="xl:ml-[280px]">
          <div className="border rounded-lg overflow-hidden h-fit">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
