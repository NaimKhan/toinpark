import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import DirectMemberReportsTable from "./components/DirectMemberReportsTable";

export const metadata = getSeoMeta({ title: "Direct Member Reports" });

export default function DirectMemberReports() {
  return (
    <PageHeader title="Direct Member Report">
      <DirectMemberReportsTable />
    </PageHeader>
  );
}
