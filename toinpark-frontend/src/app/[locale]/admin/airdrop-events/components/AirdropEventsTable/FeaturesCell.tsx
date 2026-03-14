import { CellContext } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useUpdateAAirdropEventStatusMutation } from "@/store/api/airdrop-events/airdrop-events-api";
import { TAirdropEvent } from "@/store/api/airdrop-events/airdrop-events.type";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import StatusBadge from "@/components/feature/status/StatusBadge";

export default function FeaturesCell({
  row: { original },
}: CellContext<TAirdropEvent, unknown>) {
  const { toast } = useToast();
  const [UpdateAAirdropEventStatus, { isLoading }] =
    useUpdateAAirdropEventStatusMutation();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleToggle = async () => {
    setOpenConfirmDialog(true);
  };

  const executeStatusUpdate = async () => {
    const checked = !original?.isActive;
    const toastId = toast({
      variant: "loading",
      title: `Loading...`,
      description: "Please wait while we apply your changes.",
    });
    try {
      await UpdateAAirdropEventStatus({
        id: original.id,
        body: { isActive: checked },
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Features status for "${original?.eventName}" has been updated successfully.`,
      });
      setOpenConfirmDialog(false);
    } catch (error) {
      console.info("Failed to update features status:", error);
      toastId.update({
        id: toastId.id,
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update features status.",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={original?.isActive ? "ACTIVE" : "INACTIVE"} />
      <Switch
        className="cursor-pointer"
        checked={original?.isActive}
        disabled={isLoading}
        onCheckedChange={handleToggle}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={executeStatusUpdate}
        title="Change Features Status"
        description={`Are you sure you want to ${original?.isActive ? "deactivate" : "activate"} "${original?.eventName}"?`}
        confirmBtnText="Confirm"
      />
    </div>
  );
}
