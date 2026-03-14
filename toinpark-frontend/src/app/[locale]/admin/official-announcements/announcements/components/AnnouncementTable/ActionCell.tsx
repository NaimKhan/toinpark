"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { TOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";
import { useDeleteAOfficialAnnouncementMutation } from "@/store/api/official-announcements/official-announcements.api";
import ShowAnnouncementModal from "../AnnouncementModals/ShowAnnouncementModal";
import EditAnnouncementModal from "../AnnouncementModals/EditAnnouncementModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function ActionCell({
  row: { original },
}: CellContext<TOfficialAnnouncement, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteAOfficialAnnouncement, { isLoading }] =
    useDeleteAOfficialAnnouncementMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete the announcement",
    });
    try {
      await deleteAOfficialAnnouncement({ id: original.id }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Announcement deleted successfully",
      });
    } catch (error) {
      console.error("Delete failed:", error);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to update status",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center last:justify-end gap-2">
      <ShowAnnouncementModal announcementId={original?.id} />
      <EditAnnouncementModal announcementId={original?.id} />

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
        onConfirm={handleDelete}
        title={`Delete ${original?.title} Announcement`}
        description="Are you sure you want to delete this official announcement? This action cannot be undone."
      />
    </div>
  );
}
