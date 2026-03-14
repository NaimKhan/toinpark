import { getSeoMeta } from "@/lib/getSeoMeta";
import TutorialTable from "./components/TutorialTable";
import AddTutorialModal from "./components/TutorialModals/AddTutorialModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Tutorials" });

export default function Tutorial() {
  return (
    <PageHeader title="Tutorial" action={<AddTutorialModal />}>
      <TutorialTable />
    </PageHeader>
  );
}
