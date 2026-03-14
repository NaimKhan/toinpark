import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  TGetMyTickets,
  TicketPriority,
} from "@/store/api/tickets/tickets.types";
import { CellContext } from "@tanstack/react-table";
import { useUpdateTicketPriorityMutation } from "@/store/api/tickets/tickets-api";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

export default function PriorityCell({
  row: { original },
}: CellContext<TGetMyTickets, unknown>) {
  const { toast } = useToast();
  const [UpdateTicketPriority, { isLoading }] =
    useUpdateTicketPriorityMutation();

  const [status, setStatus] = useState<TicketPriority>(
    original.priority as TicketPriority
  );

  const handleChange = async (value: string) => {
    const newPriority = value as TicketPriority;
    setStatus(value as TicketPriority);
    const toastId = toast({
      title: "Updating Ticket Priority",
      description: "Please wait while we apply your changes.",
      variant: "loading",
    });
    try {
      await UpdateTicketPriority({
        id: original.id as string,
        priority: newPriority,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Ticket Priority Updated",
        description: `Ticket Priority has been updated successfully.`,
        variant: "success",
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        title: "Failed To Update Ticket Priority",
        description: getApiMessage(error),
        variant: "error",
      });
    }
  };
  return (
    <Select disabled={isLoading} value={status} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] gap-1 px-4 !h-10 text-base text-center">
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {Object.values(TicketPriority).map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
