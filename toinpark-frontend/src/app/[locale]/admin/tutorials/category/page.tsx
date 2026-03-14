import { getSeoMeta } from "@/lib/getSeoMeta";
import CategoryTable from "./components/CategoryTable";
import AddCategoryModal from "./components/CategoryModals/AddCategoryModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Tutorial Categories" });

export default function Category() {
  return (
    <PageHeader title="Category List" action={<AddCategoryModal />}>
      <CategoryTable />
    </PageHeader>
  );
}
