import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import StatusCell from "./StatusCell";
import PriorityCell from "./PriorityCell";
import { TGetMyTickets } from "@/store/api/tickets/tickets.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TGetMyTickets>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "ticketNo",
    header: "Ticket No",
    cell: ({ row }) => (
      <span className="max-w-[350px] line-clamp-1 truncate">
        {row.getValue("ticketNo") || "-"}
      </span>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <span className="max-w-[300px] line-clamp-1 truncate">
        {row.getValue("subject")}
      </span>
    ),
  },
  {
    accessorKey: "ticketCategory",
    header: "Ticket Category",
    cell: ({ row: { original } }) => (
      <span className="max-w-[200px] line-clamp-1 truncate">
        {original?.category?.name}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: PriorityCell,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
