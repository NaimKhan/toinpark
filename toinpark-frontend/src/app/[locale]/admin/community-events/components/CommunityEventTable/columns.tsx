import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { TCommunityEvent } from "@/store/api/community-events/community-events.types";
import FeaturedStatusCell from "./FeaturedStatusCell";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TCommunityEvent>[] = [
  {
    accessorKey: crypto.randomUUID(),
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
    accessorKey: "eventType",
    header: "Event Type",
    cell: ({ row }) => <span>{row.getValue("eventType")}</span>,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Featured",
    cell: FeaturedStatusCell,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
