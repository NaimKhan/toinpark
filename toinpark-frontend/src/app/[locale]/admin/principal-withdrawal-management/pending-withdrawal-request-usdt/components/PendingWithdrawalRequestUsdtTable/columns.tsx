import { type ColumnDef } from "@tanstack/react-table";
import statusCell from "./statusCell";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TWithdrawalRequestItem } from "@/store/api/withdrawal-requests/withdrawal-requests.type";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TWithdrawalRequestItem>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
    size: 50,
  },
  {
    accessorKey: "creator.username",
    header: "User ID",
    cell: ({ row }) => (
      <span className="text-primary">{row.original?.creator?.username}</span>
    ),
  },
  {
    header: "Full Name",
    cell: ({ row }) => {
      const profile = row.original?.creator?.userProfile;
      return (
        <span>
          {profile?.firstName} {profile?.lastName}
        </span>
      );
    },
  },
  {
    header: "Investment Name",
    cell: ({ row }) => {
      const profile = row.original?.userStakingPackage?.package?.name;
      return <span>{profile || "-"}</span>;
    },
  },
  {
    header: "Principle TOIN",
    cell: ({ row }) => (
      <span>{row.original?.userStakingPackage?.toinAmount}</span>
    ),
  },
  {
    header: "Principle USDT",
    cell: ({ row }) => (
      <span>{row.original?.userStakingPackage?.usdtAmount}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Requested Withdrawal (USDT)",
    cell: ({ row }) => <span>{row.original?.amount}</span>,
  },
  {
    accessorKey: "platformFee",
    header: "Transaction Charge (USDT)",
    cell: ({ row }) => <span>{row.original?.platformFee}</span>,
  },
  {
    header: "Payable Amount (USDT)",
    cell: ({ row }) => {
      const amount = row.original?.amount || 0;
      const fee = row.original?.platformFee || 0;
      return <span>{(amount - fee).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Requested Date",
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
  {
    accessorKey: "address",
    header: "Wallet Address",
    cell: ({ row }) => <span>{row.original?.address}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original?.status.toLowerCase()} />
    ),
  },
  {
    header: "Action",
    cell: statusCell,
  },
];
