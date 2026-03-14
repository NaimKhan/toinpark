import { CellContext } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { TCommunityEvent } from "@/store/api/community-events/community-events.types";
import { useUpdateCommunityEventFeaturedStatusMutation } from "@/store/api/community-events/community-events-api";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge from "@/components/feature/status/StatusBadge";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function FeaturedStatusCell({
  row: { original },
}: CellContext<TCommunityEvent, unknown>) {
  const { toast } = useToast();
  const [updateFeaturedStatus, { isLoading }] =
    useUpdateCommunityEventFeaturedStatusMutation();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleToggle = async () => {
    setOpenConfirmDialog(true);
  };

  const executeStatusUpdate = async () => {
    const checked = !original?.isFeatured;
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the status.",
    });
    try {
      await updateFeaturedStatus({
        id: original.id,
        body: { isFeatured: checked },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Featured status updated successfully",
      });
      setOpenConfirmDialog(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to update status",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={original?.isFeatured ? "FEATURED" : "NORMAL"} />
      <Switch
        className="cursor-pointer"
        checked={original?.isFeatured}
        disabled={isLoading}
        onCheckedChange={handleToggle}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={executeStatusUpdate}
        title="Change Featured Status"
        description={`Are you sure you want to change the featured status of "${original?.title}"?`}
        confirmBtnText="Confirm"
      />
    </div>
  );
}
