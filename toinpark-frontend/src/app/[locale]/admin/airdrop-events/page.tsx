import { getSeoMeta } from "@/lib/getSeoMeta";
import AirdropEventsTable from "./components/AirdropEventsTable";
import AddAirdropEventModal from "./components/AirdropEventsModal/AddAirdropEventModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Airdrop Events" });

export default function AirdropEvents() {
  return (
    <PageHeader title="Airdrop Events" action={<AddAirdropEventModal />}>
      <AirdropEventsTable />
    </PageHeader>
  );
}
