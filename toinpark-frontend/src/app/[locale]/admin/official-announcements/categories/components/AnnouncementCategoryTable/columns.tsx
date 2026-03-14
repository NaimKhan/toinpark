import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import StatusCell from "./StatusCell";
import { TAnnouncementCategory } from "@/store/api/announcement-categories/announcement-categories.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TAnnouncementCategory>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => (
      <span className="ps-2 line-clamp-1 min-w-[250px] truncate text-wrap">
        {row.getValue("name")}
      </span>
    ),
    size: 200,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="ps-2 line-clamp-1 min-w-[250px] truncate text-wrap">
        {row.getValue("description")}
      </span>
    ),
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ActionCell,
  },
];
