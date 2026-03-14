import { getSeoMeta } from "@/lib/getSeoMeta";
import TicketManagementTable from "./components/TicketManagementTable";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Ticket Management" });

export default function TicketManagement() {
  return (
    <PageHeader title="Ticket Management">
      <TicketManagementTable />
    </PageHeader>
  );
}
