import { type ColumnDef } from "@tanstack/react-table";
import TitleCell from "./TitleCell";
import ActionCell from "./ActionCell";
import FeaturedCell from "./FeaturedCell";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export const columns: ColumnDef<TTutorialData>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "title",
    header: () => <span className=" w-full text-start">Title</span>,
    enableSorting: true,
    cell: TitleCell,
    size: 100,
  },
  {
    accessorKey: "type",
    header: () => <span className="w-full text-start">Type</span>,
    enableSorting: true,
    cell: ({ row }) => <span className="ps-2">{row.getValue("type")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="w-full text-start">Created At</span>,
    enableSorting: true,
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
        }) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: () => <span className="w-full text-start">Featured</span>,
    cell: FeaturedCell,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: () => <span className="w-full text-start">Action</span>,
    cell: ActionCell,
  },
];
