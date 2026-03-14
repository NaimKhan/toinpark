import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TDownlineMember } from "@/store/api/downline-member-reports/downline-member-reports.type";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/navigation";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TDownlineMember>[] = [
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
  {
    accessorKey: "sponsorToinAccountNumber",
    header: "Sponsor ID",
    cell: ({ row }) => (
      <span>{row.getValue("sponsorToinAccountNumber") || "-"}</span>
    ),
  },
  {
    accessorKey: "sponsorName",
    header: "Sponsor Name",
    cell: ({ row }) => <span>{row.getValue("sponsorName") || "-"}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Registration Date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
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
    header: "Downline Team",
    cell: ({ row }) => {
      const memberId = (row.original as any).id || (row.original as any).userId;

      return (
        <Link
          href={`/admin/reports-management/downline-member-reports/${memberId}`}
        >
          <CommonTooltip content="View">
            <Button className="bg-transparent hover:bg-transparent text-primary hover:text-default-100 text-sm">
              View Downline Members
            </Button>
          </CommonTooltip>
        </Link>
      );
    },
  },
];
