import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import MemberSummaryReportTable from "./components/MemberSummaryReportTable";

export const metadata = getSeoMeta({ title: "Member Summary Reports" });

export default function MemberSummaryReport() {
  return (
    <PageHeader title="Member Summary List">
      <MemberSummaryReportTable />
    </PageHeader>
  );
}
