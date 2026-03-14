import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import BlockedMemberTable from "./components/BlockedMemberTable";

export const metadata = getSeoMeta({ title: "Blocked Member List" });

export default function BlockedMemberList() {
  return (
    <PageHeader title="Blocked Member List">
      <BlockedMemberTable />
    </PageHeader>
  );
}
