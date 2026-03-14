import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import CancelWithdrawalRequestTable from "./components/CancelWithdrawalRequestTable";

export const metadata = getSeoMeta({ title: "Canceled Principal Withdrawals" });

export default function CancelWithdrawalRequest() {
  return (
    <PageHeader title="Rejected Principal Withdrawal Request List">
      <CancelWithdrawalRequestTable />
    </PageHeader>
  );
}
