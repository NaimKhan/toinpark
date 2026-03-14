import { getSeoMeta } from "@/lib/getSeoMeta";
import TabsPage from "./components/TabsPage";
import RateDisplay from "./components/RateDisplay";

export const metadata = getSeoMeta({ title: "Staking Center" });

export default function StakingCenter() {
  return (
    <div>
      {/* Rate Section */}
      <RateDisplay />

      {/* Tabs Section */}
      <TabsPage />
    </div>
  );
}
