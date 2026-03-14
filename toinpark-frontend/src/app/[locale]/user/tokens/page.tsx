import { getSeoMeta } from "@/lib/getSeoMeta";
import TOINWalletHistoryTabContent from "./components/toin-wallet-history/TOINWalletHistoryContent";
import TOINSummaryContent from "./components/toin-summary/TOINSummaryContent";
export const metadata = getSeoMeta({ title: "Token" });

function Token() {
  return (
    <div>
      {/* <TabsPage /> */}
      <TOINSummaryContent />
      <TOINWalletHistoryTabContent />
    </div>
  );
}

export default Token;
