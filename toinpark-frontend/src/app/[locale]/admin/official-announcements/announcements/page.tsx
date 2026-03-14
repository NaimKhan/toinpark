import AnnouncementTable from "./components/AnnouncementTable";
import { getSeoMeta } from "@/lib/getSeoMeta";
import AddAnnouncementModal from "./components/AnnouncementModals/AddAnnouncementModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Official Announcements" });

export default function Announcements() {
  return (
    <PageHeader
      title="Official Announcements"
      action={<AddAnnouncementModal />}
    >
      <AnnouncementTable />
    </PageHeader>
  );
}
