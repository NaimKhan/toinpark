import Link from "next/link";
import StatusBadge from "@/components/feature/status/StatusBadge";
import { Button } from "@/components/ui/button";
import WithdrawalModal from "./WithdrawalModal";
import { TUserStakingPackageItem } from "@/store/api/user-staking-package/user-staking-package.type";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { ColumnDef } from "@tanstack/react-table";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import { getTransactionStatusColor } from "@/lib/status-colors/transactionBadgeColor";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TUserStakingPackageItem>[] = [
  {
    accessorKey: "serialNumber",
    header: () => <div className="text-center leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "user.username",
    header: "User ID",
    cell: ({ row }) => <span>{row.original?.user?.username}</span>,
  },
  {
    accessorKey: "package.name",
    header: "Investment Name",
    cell: ({ row }) => <span>{row.original?.package?.name}</span>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: () => <span>-</span>,
  },
  {
    accessorKey: "toinAmount",
    header: "Principle TOIN",
    cell: ({ row }) => <span>{row.original?.toinAmount}</span>,
  },
  {
    accessorKey: "usdtAmount",
    header: "Principle USDT",
    cell: ({ row }) => <span>{row.original?.usdtAmount}</span>,
  },
  {
    accessorKey: "totalToinDebitAmount",
    header: "Total TOIN Debit",
    cell: ({ row }) => <span>{row.original?.totalToinDebitAmount}</span>,
  },
  {
    accessorKey: "totalToinCreditAmount",
    header: "Total TOIN Credit",
    cell: ({ row }) => <span>{row.original?.totalToinCreditAmount}</span>,
  },
  {
    accessorKey: "totalUSDTDebitAmount",
    header: "Total USDT Debit",
    cell: ({ row }) => <span>{row.original?.totalUSDTDebitAmount}</span>,
  },
  {
    accessorKey: "totalUSDTCreditAmount",
    header: "Total USDT Credit",
    cell: ({ row }) => <span>{row.original?.totalUSDTCreditAmount}</span>,
  },
  {
    accessorKey: "toinBalanceAmount",
    header: "Balance TOIN",
    cell: ({ row }) => <span>{row.original?.toinBalanceAmount}</span>,
  },
  {
    accessorKey: "usdtBalanceAmount",
    header: "Balance USDT",
    cell: ({ row }) => <span>{row.original?.usdtBalanceAmount}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Initial Date",
    cell: ({ row: { original } }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: original?.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: original?.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "stakeCreatedBy",
    header: "Staked By",
    cell: ({ row }) => <span>{row.original?.stakeCreatedBy}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const stakeTransaction = row.original?.transactions?.find(
        (trx: any) => trx.trxType === "STAKE",
      );
      const status = stakeTransaction?.trxStatus || "-";
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <WithdrawalModal data={row.original as any} />
        <Link href={`./staking-center/history/${row.original.id}`}>
          <Button
            size="sm"
            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-all duration-300"
          >
            History
          </Button>
        </Link>
      </div>
    ),
  },
];
