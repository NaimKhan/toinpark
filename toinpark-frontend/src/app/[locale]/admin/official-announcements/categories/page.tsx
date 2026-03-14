import { getSeoMeta } from "@/lib/getSeoMeta";
import AnnouncementCategoriesTable from "./components/AnnouncementCategoryTable";
import AddAnnouncementCategoryModal from "./components/AnnouncementCategoryModals/AddAnnouncementCategoryModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Announcement Categories" });

export default function Categories() {
  return (
    <PageHeader
      title="Announcement Categories"
      action={<AddAnnouncementCategoryModal />}
    >
      <AnnouncementCategoriesTable />
    </PageHeader>
  );
}
