import { TReferralMilestone } from "@/store/api/referral-milestone/referral-milestone.type";
import { CellContext } from "@tanstack/react-table";
import EditReferralMilestoneModals from "../ReferralMilestoneModals/EditReferralMilestoneModals";
import DeleteReferralMilestone from "./DeleteReferralMilestone";

export default function ActionCell({
  row: { original },
}: CellContext<TReferralMilestone, unknown>) {
  return (
    <div className="flex items-center last:justify-end gap-2">
      <EditReferralMilestoneModals referralId={original.id} />
      <DeleteReferralMilestone id={original.id} referralName={original.referralName} />
    </div>
  );
}
