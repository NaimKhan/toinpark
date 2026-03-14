import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteAAirdropEventMutation } from "@/store/api/airdrop-events/airdrop-events-api";
import { TAirdropEvent } from "@/store/api/airdrop-events/airdrop-events.type";
import { CellContext } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ViewAirdropEventModal from "../AirdropEventsModal/viewAirdropEventModal";
import EditAAirdropEventModal from "../AirdropEventsModal/EditCategoryModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function ActionCell({
  row: { original },
}: CellContext<TAirdropEvent, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteAAirdropEvent, { isLoading }] = useDeleteAAirdropEventMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "deleting Airdrop event...",
      description: "Please wait while we delete the item.",
    });
    try {
      await deleteAAirdropEvent({ id: original.id }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Airdrop event "${original?.eventName}" has been permanently removed.`,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete airdrop event.",
      });
    }
  };
  return (
    <div className="flex justify-end items-center gap-2">
      <ViewAirdropEventModal airdropEventId={original?.id} />
      <EditAAirdropEventModal airdropEventId={original?.id} />
      <CommonTooltip content="Delete">
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          disabled={isLoading}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete ${original?.eventName} Airdrop Event`}
        description="Are you sure you want to delete this airdrop event? This action cannot be undone."
      />
    </div>
  );
}
