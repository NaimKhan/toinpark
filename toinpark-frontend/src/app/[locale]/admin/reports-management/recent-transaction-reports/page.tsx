import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import RecentTransactionReportsTable from "./components/RecentTransactionReportsTable";

export const metadata = getSeoMeta({ title: "Recent Transaction Reports" });

export default function RecentTransactionReports() {
  return (
    <PageHeader title="Recent Transaction Report">
      <RecentTransactionReportsTable />
    </PageHeader>
  );
}
