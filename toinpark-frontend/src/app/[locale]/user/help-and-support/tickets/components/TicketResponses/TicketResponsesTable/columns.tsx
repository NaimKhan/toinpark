import { type ColumnDef } from "@tanstack/react-table";
import { TGetMyTickets } from "@/store/api/tickets/tickets.types";
import ActionCell from "./ActionCell";
import { Badge } from "@/components/ui/badge";
import {
  getTicketPriorityColor,
  getTicketStatusColor,
} from "@/lib/status-colors/ticketBadgeColor";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TGetMyTickets>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: () => <div className="text-center leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
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
      <span className="line-clamp-1 min-w-[380px] truncate text-wrap">
        {row.getValue("subject")}
      </span>
    ),
    enableSorting: true,
  },

  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original } }) => (
      <span className="max-w-[250px] line-clamp-1 truncate">
        {original?.category?.name}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      // <Badge
      //   className={`${getTicketStatusColor(row.getValue("status"))} capitalize`}
      // >
      //   {row.getValue("status")?.toString().toLowerCase() ?? ""}
      // </Badge>
      <StatusBadge
        status={row.getValue("status")?.toString().toLowerCase() ?? ""}
      />
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span>
        <Badge
          className={`${getTicketPriorityColor(
            row.getValue("priority"),
          )} capitalize`}
        >
          {row.getValue("priority")?.toString().toLowerCase() ?? ""}
        </Badge>
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.original.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.original.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
