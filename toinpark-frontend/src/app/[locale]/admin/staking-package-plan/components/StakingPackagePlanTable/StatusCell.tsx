import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { useUpdateAStakingPackageStatusMutation } from "@/store/api/staking-package/staking-package-api";
import { TGetAStakingPackage } from "@/store/api/staking-package/staking-package.type";
import { CellContext } from "@tanstack/react-table";

import StatusBadge from "@/components/feature/status/StatusBadge";

export default function StatusCell({
  row: { original },
}: CellContext<TGetAStakingPackage, unknown>) {
  const status = original?.isActive;
  const { toast } = useToast();
  const [UpdateAStakingPackageStatus, { isLoading }] =
    useUpdateAStakingPackageStatusMutation();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleToggle = async () => {
    setOpenConfirmDialog(true);
  };

  const executeStatusUpdate = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      await UpdateAStakingPackageStatus({ id: original.id }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Status for "${original?.name}" has been updated successfully.`,
      });
      setOpenConfirmDialog(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update status.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <StatusBadge status={status ? "Active" : "Inactive"} />
        <Switch
          disabled={isLoading}
          className="cursor-pointer"
          checked={status}
          onCheckedChange={handleToggle}
        />
      </div>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={executeStatusUpdate}
        title="Change Status"
        description={`Are you sure you want to ${status ? "deactivate" : "activate"} "${original?.name}"?`}
        confirmBtnText="Confirm"
      />
    </>
  );
}
