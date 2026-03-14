import { getSeoMeta } from "@/lib/getSeoMeta";
import TabsPage from "./components/TabsPage";
export const metadata = getSeoMeta({ title: "Tickets" });

function Tickets() {
  return (
    <div>
      {/* Tabs Section */}
      <TabsPage />
    </div>
  );
}

export default Tickets;
