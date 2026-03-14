import { TDirectMember } from "@/store/api/direct-member-reports/direct-member-reports.types";
import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/navigation";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TDirectMember>[] = [
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
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <span>
        {`${row.original?.userProfile?.firstName} ${row.original?.userProfile?.lastName}` ||
          "-"}
      </span>
    ),
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
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status || "-"} />;
    },
  },
  {
    accessorKey: "action",
    header: "Direct Team",
    cell: ({ row }) => {
      const memberId = (row.original as any).id || (row.original as any).userId;

      return (
        <Link
          href={`/admin/reports-management/direct-member-reports/${memberId}`}
        >
          <CommonTooltip content="View">
            <Button className="bg-transparent hover:bg-transparent text-primary hover:text-default-100 text-sm">
              View Direct Members
            </Button>
          </CommonTooltip>
        </Link>
      );
    },
  },
];
