import GradientText from "@/components/feature/text/gradientText";
import { getSeoMeta } from "@/lib/getSeoMeta";
import SearchComponent from "@/components/ui/SearchComponent";
import TOINAnnouncementsTable from "./components/TOIAnnouncementsTable";
export const metadata = getSeoMeta({ title: "TOI Announcements" });

function ToiAnnouncements() {
  return (
    <div className="px-6 py-6 xl:px-16 md:px-10 md:py-12 space-y-6">
      <div className="flex flex-wrap items-start md:items-end justify-between w-full gap-6">
        <div className="space-y-4 text-start flex-1">
          <GradientText
            type="secondary"
            label="TOI Announcements"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            Stay updated with the latest news, updates, and important platform
            alerts.
          </p>
        </div>
        <div className="flex-none">
          <SearchComponent placeholder="Search" className="w-full !h-12" />
        </div>
      </div>
      <TOINAnnouncementsTable />
    </div>
  );
}

export default ToiAnnouncements;
