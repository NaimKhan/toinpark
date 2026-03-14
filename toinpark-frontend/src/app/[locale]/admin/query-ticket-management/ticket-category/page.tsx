import { getSeoMeta } from "@/lib/getSeoMeta";
import TicketCategoryTable from "./components/TicketCategoryTable";
import AddTicketCategory from "./components/TicketCategoryModals/AddTicketCategory";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Ticket Categories" });

export default function TicketCategory() {
  return (
    <PageHeader
      title="Ticket Category Management"
      action={<AddTicketCategory />}
    >
      <TicketCategoryTable />
    </PageHeader>
  );
}
