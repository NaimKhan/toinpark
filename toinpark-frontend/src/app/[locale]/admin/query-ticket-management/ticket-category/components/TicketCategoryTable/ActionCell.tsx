import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import EditTicketCategory from "../TicketCategoryModals/EditTicketCategory";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteATicketCategoryMutation } from "@/store/api/tickets-categories/tickets-categories-api";
import { CellContext } from "@tanstack/react-table";
import { TGetTicketsCategoriesData } from "@/store/api/tickets-categories/tickets-categories.types";
import ShowTicketCategory from "../TicketCategoryModals/ShowTicketCategory";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function ActionCell({
  row: { original },
}: CellContext<TGetTicketsCategoriesData, unknown>) {
  const { toast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteATicketCategory, { isLoading }] =
    useDeleteATicketCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      await deleteATicketCategory({
        id: original.id,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `The Ticket Category "${original?.name}" has been permanently removed.`,
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to delete ticket category.",
      });
    }
  };
  return (
    <div className="flex justify-end items-center gap-4">
      <ShowTicketCategory ticketId={original.id} />

      <EditTicketCategory ticketId={original.id} />

      <CommonTooltip content="Delete">
        <Button
          disabled={isLoading}
          onClick={() => setOpenDeleteDialog(true)}
          className="bg-transparent hover:bg-transparent p-2  text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10"
        >
          <Trash2 />
        </Button>
      </CommonTooltip>

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete "${original?.name}" Ticket Category`}
        description="Are you sure you want to delete this ticket category? This action cannot be undone."
      />
    </div>
  );
}
