import { getSeoMeta } from "@/lib/getSeoMeta";
import MyTeamAccordion from "../components/my-team/MyTeamAccordion";
import PageHeaderContent from "./PageHeaderContent";
export const metadata = getSeoMeta({ title: "My Team" });

function MyTeam() {
  return (
    <div className="space-y-8 md:space-y-10">
      <PageHeaderContent />
      <div className="px-6 xl:px-16 md:px-10 space-y-6 pb-5 md:pb-0">
        <MyTeamAccordion />
      </div>
    </div>
  );
}

export default MyTeam;
