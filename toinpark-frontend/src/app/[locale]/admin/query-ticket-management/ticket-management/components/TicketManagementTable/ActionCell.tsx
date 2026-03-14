import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Link } from "@/components/navigation";
import DeleteConfirmDialog from "@/components/popup/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";
import { useDeleteATicketMutation } from "@/store/api/tickets/tickets-api";
import { TGetMyTickets } from "@/store/api/tickets/tickets.types";
import { CellContext } from "@tanstack/react-table";
import { EyeIcon, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function ActionCell({
  row: { original },
}: CellContext<TGetMyTickets, unknown>) {
  const locale = useLocale();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteATicket, { isLoading }] = useDeleteATicketMutation();

  const handleDelete = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading..",
      description: "Please wait while we apply your changes.",
    });
    try {
      const response = await deleteATicket({ id: original.id }).unwrap();

      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: `Ticket has been permanently removed.`,
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Something went wrong.",
      });
    }
  };
  return (
    <div className="flex justify-end items-center gap-4">
      <CommonTooltip content="View">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
          asChild
        >
          <Link
            href={`/${locale}/admin/query-ticket-management/ticket-management/chat?ticketId=${original.id}`}
          >
            <EyeIcon />
          </Link>
        </Button>
      </CommonTooltip>

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
        title={`Delete ${original?.subject} Ticket`}
        description="Are you sure you want to delete this ticket? This action cannot be undone."
      />
    </div>
  );
}
