import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TWithdrawalRequestItem } from "@/store/api/withdrawal-requests/withdrawal-requests.type";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusCell from "./statusCell";
import StatusBadge from "@/components/feature/status/StatusBadge";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";

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
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => {
      const remark = row.original.remark;
      if (!remark) return <span>-</span>;
      return (
        <CommonTooltip
          content={remark}
          contentClassName="max-w-[250px] text-base break-words"
        >
          <span className="text-start w-full ps-3 max-w-[250px] truncate line-clamp-1 cursor-help break-words">
            {remark}
          </span>
        </CommonTooltip>
      );
    },
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
    accessorKey: "updatedAt",
    header: "Rejected Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.original?.updatedAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.original?.updatedAt,
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
    cell: ({ row }) => <StatusBadge status={row.original?.status} />,
  },
];
