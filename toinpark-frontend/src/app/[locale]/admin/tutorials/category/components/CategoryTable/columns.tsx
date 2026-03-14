import { type ColumnDef } from "@tanstack/react-table";
import StatusCell from "./StatusCell";
import ActionCell from "./ActionCell";
import { TCategory } from "@/store/api/tutorial-categories/tutorial-categories.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-start w-full ps-3 max-w-[200px] truncate line-clamp-1">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[350px] truncate ps-3">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: StatusCell,
  },

  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
