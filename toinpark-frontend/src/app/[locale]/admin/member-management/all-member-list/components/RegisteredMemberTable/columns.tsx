import { type ColumnDef } from "@tanstack/react-table";
import StatusCell from "./StatusCell";
import { TMember } from "@/store/api/members/members.types";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import ActionCell from "./ActionCell";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export const columns: ColumnDef<TMember>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
    size: 40,
  },

  {
    accessorKey: "username",
    header: "User ID",
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("username") || "-"}</span>,
  },
  {
    accessorKey: "userProfile",
    header: "Full Name",
    cell: ({ row }) => (
      <span>
        {`${row.original?.userProfile?.firstName} ${row.original?.userProfile?.lastName}` ||
          "-"}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email") || "-"}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => <span>{row.getValue("phoneNumber") || "-"}</span>,
  },
  {
    accessorKey: "sponsorName",
    header: "Sponsor Name",
    cell: ({ row }) => <span>{row.getValue("sponsorName") || "-"}</span>,
  },
  {
    accessorKey: "userRole",
    header: "User Type",
    cell: ({ row }) => <span>{row.getValue("userRole") || "-"}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Registration Date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.original?.createdAt,
        }) || "-"}
      </span>
    ),
    enableSorting: true,
  },

  {
    accessorKey: "status",
    header: "Login Status",
    cell: StatusCell,
    size: 200,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
    enableSorting: true,
  },
];
