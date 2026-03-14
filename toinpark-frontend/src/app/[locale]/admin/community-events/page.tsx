import { getSeoMeta } from "@/lib/getSeoMeta";
import AddCommunityEventModal from "./components/CommunityEventModals/AddCommunityEventModal";
import CommunityEventsTable from "./components/CommunityEventTable";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Community Events" });

export default function Categories() {
  return (
    <PageHeader title="Community Events" action={<AddCommunityEventModal />}>
      <CommunityEventsTable />
    </PageHeader>
  );
}
