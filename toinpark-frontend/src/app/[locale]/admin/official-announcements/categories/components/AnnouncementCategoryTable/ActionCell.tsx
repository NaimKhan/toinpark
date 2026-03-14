"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { TAnnouncementCategory } from "@/store/api/announcement-categories/announcement-categories.types";
import { useDeleteAAnnouncementCategoryMutation } from "@/store/api/announcement-categories/announcement-categories-api";
import ShowAnnouncementCategoryModal from "../AnnouncementCategoryModals/ShowAnnouncementCategoryModal";
import EditAnnouncementCategoryModal from "../AnnouncementCategoryModals/EditAnnouncementCategoryModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function ActionCell({
  row: { original },
}: CellContext<TAnnouncementCategory, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteAAnnouncementCategory, { isLoading }] =
    useDeleteAAnnouncementCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Deleting announcement category...",
      description: "Please wait while we delete the announcement category",
    });
    try {
      await deleteAAnnouncementCategory({ id: original.id }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Announcement category deleted successfully",
        description: "Please wait while we delete the announcement category",
      });
    } catch (error) {
      console.error("Delete failed:", error);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to delete announcement category",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center last:justify-end gap-2">
      <ShowAnnouncementCategoryModal announcementCategoryId={original?.id} />
      <EditAnnouncementCategoryModal announcementCategoryId={original?.id} />

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
        title={`Delete ${original?.name} Announcement Category`}
        description="Are you sure you want to delete this announcement category? This action cannot be undone."
      />
    </div>
  );
}
