import StatusBadge from "@/components/feature/status/StatusBadge";
import { TWithdrawalRequestItem } from "@/store/api/withdrawal-requests/withdrawal-requests.type";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { ColumnDef } from "@tanstack/react-table";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export const columns: ColumnDef<TWithdrawalRequestItem>[] = [
  {
    accessorKey: "serialNumber",
    header: () => <div className="text-center leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "userStakingPackage.package.name",
    header: "Investment Name",
    cell: ({ row }) => (
      <span>{row.original?.userStakingPackage?.package?.name || "-"}</span>
    ),
  },
  {
    accessorKey: "userStakingPackage.toinAmount",
    header: "Principle TOIN",
    cell: ({ row }) => (
      <span>{row.original?.userStakingPackage?.toinAmount || "-"}</span>
    ),
  },
  {
    accessorKey: "userStakingPackage.usdtAmount",
    header: "Principle USDT",
    cell: ({ row }) => (
      <span>{row.original?.userStakingPackage?.usdtAmount || "-"}</span>
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
    accessorKey: "currency",
    header: "Payment Mode",
    cell: ({ row }) => <span>{row.original?.currency}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Requested Date",
    cell: ({ row: { original } }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: original.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: original.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Approval/Rejected Date",
    cell: ({ row: { original } }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: original.updatedAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: original.updatedAt,
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
    cell: ({ row }) => {
      const status = row.original?.status || "-";
      return <StatusBadge status={status} />;
    },
  },
];
