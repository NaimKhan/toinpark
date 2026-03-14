import { type ColumnDef } from "@tanstack/react-table";
import { TReferralMemberItem } from "@/store/api/referral-levels/referral-levels.types";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import { Badge } from "@/components/ui/badge";
import { getUserStatusColor } from "@/lib/status-colors/userBadgeColor";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TReferralMemberItem>[] = [
  {
    accessorKey: "toinAccountNumber",
    header: () => <div className="leading-tight">User ID</div>,
    cell: ({ row: { original } }) => (
      <span>{original?.toinAccountNumber || "-"}</span>
    ),
    size: 40,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row: { original } }) => (
      <span>
        {original?.userProfile?.firstName} {original?.userProfile?.lastName}
      </span>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row: { original } }) => (
      <span>{original?.userProfile?.country?.name || "-"}</span>
    ),
  },
  {
    accessorKey: "createAt",
    header: "Registration Date",
    cell: ({ row: { original } }) => {
      return (
        <span className="capitalize">
          {convertUTCToLocal({ utcDateTime: original?.createdAt }) || "-"}
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: () => <div className="w-full text-right">User Status</div>,
    cell: ({ row: { original } }) => <StatusBadge status={original?.status} />,
    enableSorting: true,
  },
];
