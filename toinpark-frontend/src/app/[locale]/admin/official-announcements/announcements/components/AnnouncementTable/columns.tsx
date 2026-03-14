import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import StatusCell from "./StatusCell";
import { TOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TOfficialAnnouncement>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="ps-2 line-clamp-1 min-w-[250px] truncate text-wrap">
        {row.getValue("title")}
      </span>
    ),
    size: 200,
  },
  {
    accessorKey: "audienceType",
    header: "Audience Type",
    cell: ({ row }) => (
      <span className="ps-2 line-clamp-1 min-w-[250px] truncate text-wrap">
        {row.getValue("audienceType")}
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
