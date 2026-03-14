import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import AddFundHistoryTable from "./components/AddFundHistoryTable";

export const metadata = getSeoMeta({ title: "Add Fund History" });

function AddFundHistory() {
  return (
    <PageHeader title="Add Fund History">
      <AddFundHistoryTable />
    </PageHeader>
  );
}

export default AddFundHistory;
