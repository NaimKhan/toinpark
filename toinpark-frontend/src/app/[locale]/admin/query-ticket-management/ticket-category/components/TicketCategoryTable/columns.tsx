import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import StatusCell from "./StatusCell";
import { TGetTicketsCategoriesData } from "@/store/api/tickets-categories/tickets-categories.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TGetTicketsCategoriesData>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => (
      <span className="max-w-[500px] line-clamp-1 truncate">
        {row.getValue("name")}
      </span>
    ),
    size: 500,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
