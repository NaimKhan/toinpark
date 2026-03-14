"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { TCommunityEvent } from "@/store/api/community-events/community-events.types";
import { useDeleteACommunityEventMutation } from "@/store/api/community-events/community-events-api";
import ShowCommunityEventModal from "../CommunityEventModals/ShowCommunityEventModal";
import EditCommunityEventModal from "../CommunityEventModals/EditCommunityEventModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function ActionCell({
  row: { original },
}: CellContext<TCommunityEvent, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteACommunityEvent, { isLoading }] =
    useDeleteACommunityEventMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete the item.",
    });
    try {
      await deleteACommunityEvent({ id: original.id }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Community event deleted successfully",
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to delete community events",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center last:justify-end gap-2">
      <ShowCommunityEventModal eventId={original?.id} />
      <EditCommunityEventModal id={original?.id} />

      <CommonTooltip content="Delete">
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          disabled={isLoading}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        loading={isLoading}
        onConfirm={handleDelete}
        title={`Delete ${original?.title} Community Events`}
        description="Are you sure you want to delete this community events? This action cannot be undone."
      />
    </div>
  );
}
