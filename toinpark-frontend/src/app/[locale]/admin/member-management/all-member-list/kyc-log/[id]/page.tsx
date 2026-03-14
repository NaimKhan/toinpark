import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import KycLogTable from "./components/KycLogTable";

export const metadata = getSeoMeta({ title: "KYC Logs" });

export default function KycLogPage() {
  return (
    <PageHeader title="Member KYC Logs">
      <KycLogTable />
    </PageHeader>
  );
}
