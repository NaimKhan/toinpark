import { type ColumnDef } from "@tanstack/react-table";
import { TOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";
import ShowAnnouncementModal from "./view";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

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
    accessorKey: "createdAt",
    header: "Posted Date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.original?.createdAt,
        })}
      </span>
    ),
  },
  {
    accessorKey: "detailsId",
    header: "Details",
    cell: ({ row: { original } }) => (
      <ShowAnnouncementModal announcementId={original?.id} />
    ),
  },
];
