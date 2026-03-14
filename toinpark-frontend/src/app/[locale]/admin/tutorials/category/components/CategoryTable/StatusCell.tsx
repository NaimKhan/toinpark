import { CellContext } from "@tanstack/react-table";
import { TCategory } from "@/store/api/tutorial-categories/tutorial-categories.types";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ConfirmDialog from "@/components/popup/ConfirmDialog";
import { useUpdateTutorialCategoryMutation } from "@/store/api/tutorial-categories/tutorial-categories-api";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import StatusBadge from "@/components/feature/status/StatusBadge";

export default function StatusCell({
  row: { original },
}: CellContext<TCategory, unknown>) {
  const { toast } = useToast();
  const [updateCategory, { isLoading }] = useUpdateTutorialCategoryMutation();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleToggle = async () => {
    setOpenConfirmDialog(true);
  };

  const executeStatusUpdate = async () => {
    const checked = !original?.isActive;
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      await updateCategory({
        id: original.id,
        body: { isActive: checked },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Status for "${original.name}" has been updated successfully.`,
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
        title="Change Status"
        description={`Are you sure you want to ${original?.isActive ? "deactivate" : "activate"} "${original.name}"?`}
        confirmBtnText="Confirm"
      />
    </div>
  );
}
