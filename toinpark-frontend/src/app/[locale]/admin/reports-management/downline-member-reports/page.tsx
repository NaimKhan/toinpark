import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import DownlineMemberReportsTable from "./components/DownlineMemberReportsTable";

export const metadata = getSeoMeta({ title: "Downline Member Reports" });

export default function DownlineMemberReports() {
  return (
    <PageHeader title="Downline Member Report">
      <DownlineMemberReportsTable />
    </PageHeader>
  );
}
