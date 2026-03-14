import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import RegisteredMemberTable from "./components/RegisteredMemberTable";

export const metadata = getSeoMeta({ title: "All Member List" });

export default function AllMemberList() {
  return (
    <PageHeader title="Registered Member List">
      <RegisteredMemberTable />
    </PageHeader>
  );
}
