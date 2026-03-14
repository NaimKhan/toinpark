import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import DeductFundHistoryTable from "./components/DeductFundHistoryTable";

export const metadata = getSeoMeta({ title: "Deduct Fund History" });

function DeductFundHistory() {
  return (
    <PageHeader title="Deduct Fund History">
      <DeductFundHistoryTable />
    </PageHeader>
  );
}

export default DeductFundHistory;
