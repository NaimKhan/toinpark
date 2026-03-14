import { CellContext } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import { useUpdateFeatureTutorialMutation } from "@/store/api/tutorials/tutorials-api";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import StatusBadge from "@/components/feature/status/StatusBadge";

export default function FeaturedCell({
  row: { original },
}: CellContext<TTutorialData, unknown>) {
  const { toast } = useToast();
  const [updateTutorialFeature, { isLoading }] =
    useUpdateFeatureTutorialMutation();

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
      await updateTutorialFeature({
        id: original.id,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `The tutorial "${
          (original?.title?.length ?? 0) > 50
            ? original?.title?.substring(0, 50) + "..."
            : (original?.title ?? "Untitled")
        }" has been updated successfully.`,
      });
      setOpenConfirmDialog(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update tutorial status.",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <StatusBadge status={original?.isFeatured ? "FEATURED" : "NORMAL"} />
      <Switch
        className="cursor-pointer"
        checked={original?.isFeatured || false}
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
