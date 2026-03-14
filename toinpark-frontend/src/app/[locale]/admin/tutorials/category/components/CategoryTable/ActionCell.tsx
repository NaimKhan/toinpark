"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import EditCategoryModal from "../CategoryModals/EditCategoryModal";
import { CellContext } from "@tanstack/react-table";
import { TCategory } from "@/store/api/tutorial-categories/tutorial-categories.types";
import { useDeleteATutorialCategoryMutation } from "@/store/api/tutorial-categories/tutorial-categories-api";
import { useToast } from "@/components/ui/use-toast";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import ShowCategoryModal from "../CategoryModals/ShowCategoryModal";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";

export default function ActionCell({
  row: { original },
}: CellContext<TCategory, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteATutorialCategory, { isLoading }] =
    useDeleteATutorialCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const response = await deleteATutorialCategory({
        id: original.id,
      }).unwrap();
      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: `The category "${original?.name}" has been permanently removed.`,
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to delete category.",
      });
    }
  };

  return (
    <div className="flex items-center last:justify-end gap-2">
      <ShowCategoryModal categoryId={original?.id} />
      <EditCategoryModal categoryId={original?.id} />

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
        title={`Delete "${original?.name}" Category`}
        description="Are you sure you want to delete this tutorial category? This action cannot be undone."
      />
    </div>
  );
}
