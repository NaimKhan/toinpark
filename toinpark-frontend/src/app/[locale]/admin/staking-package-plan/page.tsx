import { getSeoMeta } from "@/lib/getSeoMeta";
import StakingPackagePlanTable from "./components/StakingPackagePlanTable";
import AddStakingPackageModal from "./components/StakingPackageModals/AddStakingPackageModal";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = getSeoMeta({ title: "Staking Package Plan" });

export default function StakingPackagePlan() {
  return (
    <PageHeader
      title="Staking Package Plan"
      action={<AddStakingPackageModal />}
    >
      <StakingPackagePlanTable />
    </PageHeader>
  );
}
