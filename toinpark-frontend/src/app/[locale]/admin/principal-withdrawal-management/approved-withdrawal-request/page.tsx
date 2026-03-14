import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import ApprovedWithdrawalRequestTable from "./components/ApprovedWithdrawalRequestTable";

export const metadata = getSeoMeta({ title: "Approved Principal Withdrawals" });

export default function ApprovedWithdrawalRequest() {
  return (
    <PageHeader title="Approved Principal Withdrawal List">
      <ApprovedWithdrawalRequestTable />
    </PageHeader>
  );
}
