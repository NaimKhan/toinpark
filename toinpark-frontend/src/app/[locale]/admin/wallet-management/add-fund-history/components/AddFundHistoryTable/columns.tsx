import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TAdminStakeItem } from "@/store/api/admin-staking/admin-staking.types";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TAdminStakeItem>[] = [
  {
    header: "Serial No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "user.username",
    header: "User ID",
    cell: ({ row }) => <span>{row.original.user.username}</span>,
  },
  {
    accessorKey: "user.userProfile",
    header: "Full Name",
    cell: ({ row }) => {
      const profile = row.original.user.userProfile;
      return (
        <span>
          {`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()}
        </span>
      );
    },
  },
  {
    accessorKey: "stakedBy.username",
    header: "Admin ID",
    cell: ({ row }) => <span>{row.original.stakedBy.username}</span>,
  },
  {
    accessorKey: "stakedBy.userProfile",
    header: "Admin Name",
    cell: ({ row }) => {
      const adminProf = row.original.stakedBy.userProfile;
      return (
        <span>
          {`${adminProf?.firstName ?? ""} ${adminProf?.lastName ?? ""}`.trim() ||
            row.original.stakedBy.username}
        </span>
      );
    },
  },
  {
    header: "Amount (TOIN)",
    cell: ({ row }) => (
      <span>{row.original.transactions[0]?.toinAmount ?? "-"}</span>
    ),
  },
  {
    header: "Amount (USDT)",
    cell: ({ row }) => (
      <span>{row.original.transactions[0]?.usdtAmount ?? "-"}</span>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.transactions[0]?.trxStatus ?? "-"} />
    ),
  },
  {
    header: "Remark",
    cell: ({ row }) => <span>{row.original.remarks ?? "-"}</span>,
  },
  {
    header: "Payment Type",
    cell: () => <span>-</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.original?.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.original?.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
  },
];
