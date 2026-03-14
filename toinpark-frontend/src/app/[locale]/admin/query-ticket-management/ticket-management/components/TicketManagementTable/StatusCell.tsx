import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TGetMyTickets } from "@/store/api/tickets/tickets.types";
import { CellContext } from "@tanstack/react-table";
import { useUpdateTicketStatusMutation } from "@/store/api/tickets/tickets-api";
import { TicketStatus } from "@/store/api/tickets/tickets.types";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import ConfirmDialog from "@/components/popup/ConfirmDialog";

export default function StatusCell({
  row: { original },
}: CellContext<TGetMyTickets, unknown>) {
  const { toast } = useToast();
  const [UpdateTicketStatus, { isLoading }] = useUpdateTicketStatusMutation();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<TicketStatus | null>(null);

  const handleChange = (value: string) => {
    setPendingStatus(value as TicketStatus);
    setOpenConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingStatus) return;

    const toastId = toast({
      title: "Updating Ticket Status",
      description: "Please wait while we apply your changes.",
      variant: "loading",
    });
    try {
      await UpdateTicketStatus({
        id: original.id as string,
        status: pendingStatus,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: `Ticket Status has been updated successfully.`,
      });
      setOpenConfirmDialog(false);
      setPendingStatus(null);
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
    <>
      <Select
        disabled={isLoading}
        value={original.status ?? undefined}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[140px] gap-1 px-4 !h-10 text-base text-center">
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          {Object.values(TicketStatus).map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingStatus(null);
        }}
        onConfirm={handleConfirmUpdate}
        title="Update Ticket Status"
        description={`Are you sure you want to change the status to ${pendingStatus?.toLowerCase() || ""}?`}
        confirmBtnText="Confirm"
        iconClassName="p-4 rounded-full !bg-primary/20 text-primary"
        cancleButtonClassName="flex-1 py-3"
        confirmButtonClassName="bg-primary hover:bg-primary/80 text-white flex-1 py-3"
      />
    </>
  );
}
