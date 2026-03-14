import { getSeoMeta } from "@/lib/getSeoMeta";
import BalanceCard from "./components/BalanceCard";
import AirdropProgressCard from "./components/AirdropProgressCard";
import DashboardCardList from "./components/DashboardCardList";

export const metadata = getSeoMeta({ title: "Dashboard" });

async function DashboardPage() {
  return (
    <div>
      <div className="flex-none xl:flex border-b">
        <div className="w-full xl:w-2/5 px-6 py-8 xl:px-16 md:px-12 md:py-12">
          <BalanceCard />
        </div>

        <div className="w-full xl:w-3/5 border-t xl:border-t-0 md:border-l pt-8 pb-[81px] px-6 md:py-12 md:pb-20 md:px-16">
          <AirdropProgressCard />
        </div>
      </div>

      <div className="px-6 md:px-10 xl:px-16 py-8 md:py-12">
        <DashboardCardList />
      </div>
    </div>
  );
}

export default DashboardPage;
