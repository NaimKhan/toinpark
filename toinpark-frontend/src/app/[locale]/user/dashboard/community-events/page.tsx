import { getSeoMeta } from "@/lib/getSeoMeta";
import GradientText from "@/components/feature/text/gradientText";
import CommunityEventList from "./components";
import SearchComponent from "@/components/ui/SearchComponent";
export const metadata = getSeoMeta({ title: "Community Events" });

export default function CommunityEventsPage() {
  return (
    <div className="bg-black text-white ">
      <div className="space-y-6 md:space-y-10 px-6 py-6 xl:px-16 md:px-10 md:py-12">
        <div className="flex flex-wrap justify-between gap-4 items-center w-full ">
          <div className="flex-1">
            <GradientText
              label="Community Events"
              className="text-[28px] md:text-[34px] lg:text-[40px] font-medium"
            />

            <p className="text-lg text-default-200 mt-3">
              Explore ongoing community events and special campaigns. Stay
              connected and take part in platform activities.
            </p>
          </div>
          <div className="flex-none w-64 text-end">
            <SearchComponent className="h-12" />
          </div>
        </div>
        <CommunityEventList />
      </div>
    </div>
  );
}
