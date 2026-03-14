import { TTeamMember } from "@/store/api/member-team/member-team.types";
import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TTeamMember>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "toinAccountNumber",
    header: "User ID",
    cell: ({ row }) => <span>{row.getValue("toinAccountNumber") || "-"}</span>,
  },
  {
    accessorKey: "username",
    header: "Full Name",
    cell: ({ row }) => {
      const profile = row.original?.userProfile;
      const name = profile?.firstName
        ? `${profile.firstName} ${profile.lastName || ""}`
        : row.original.username;
      return <span>{name || "-"}</span>;
    },
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  //   cell: ({ row }) => <span>{row.getValue("email") || "-"}</span>,
  // },
  // {
  //   accessorKey: "phoneNumber",
  //   header: "Phone",
  //   cell: ({ row }) => <span>{row.getValue("phoneNumber") || "-"}</span>,
  // },
  {
    accessorKey: "createdAt",
    header: "Registration Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.getValue("createdAt"),
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.getValue("createdAt"),
          }) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status || "-"} />;
    },
  },
];
