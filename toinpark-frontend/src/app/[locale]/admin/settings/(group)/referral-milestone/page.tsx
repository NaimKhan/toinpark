import { getSeoMeta } from "@/lib/getSeoMeta";
import ReferralMilestoneTable from "./components/ReferralMilestoneTable";
import AddReferralMilestoneModals from "./components/ReferralMilestoneModals/AddReferralMilestoneModal";

export const metadata = getSeoMeta({ title: "Referral Milestone" });

export default function ReferralManagement() {
  return (
    <div>
      <AddReferralMilestoneModals />
      <ReferralMilestoneTable />
    </div>
  );
}
