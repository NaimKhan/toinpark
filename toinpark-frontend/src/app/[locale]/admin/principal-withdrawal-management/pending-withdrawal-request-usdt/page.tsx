import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import PendingWithdrawalRequestUsdtTable from "./components/PendingWithdrawalRequestUsdtTable";

export const metadata = getSeoMeta({
  title: "Pending USDT Principal Withdrawals",
});

export default function PendingWithdrawalRequestUsdt() {
  return (
    <PageHeader title="Pending Principal Withdrawal Request List">
      <PendingWithdrawalRequestUsdtTable />
    </PageHeader>
  );
}
