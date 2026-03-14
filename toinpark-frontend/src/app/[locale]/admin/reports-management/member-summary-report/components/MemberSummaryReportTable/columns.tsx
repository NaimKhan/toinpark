import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TMember } from "@/store/api/members/members.types";

export const columns: ColumnDef<TMember>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "toinAccountNumber",
    header: "User ID",
    cell: ({ row }) => (
      <span className="">
        {row.original.toinAccountNumber}
      </span>
    ),
  },
  {
    accessorFn: (row) =>
      `${row.userProfile?.firstName ?? ""} ${row.userProfile?.lastName ?? ""}`,
    id: "fullName",
    header: "Full Name",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorFn: (row) => row.userWallet?.totalStaking,
    id: "totalStaking",
    header: "Total Staked (TOIN)",
    cell: ({ row }) => (
      <span>{row.original.userWallet?.totalStaking ?? 0}</span>
    ),
  },
  {
    accessorFn: (row) =>
      (row.directMemberCount ?? 0) + (row.indirectMemberCount ?? 0),
    id: "totalReferrerCount",
    header: "Total Referrer Count",
    cell: ({ getValue }) => <span>{getValue<number>()}</span>,
  },
  {
    accessorFn: (row) => row.userWallet?.totalLevelingBonus,
    id: "totalLevelingBonus",
    header: "Total Levelling Bonus (TOIN)",
    cell: ({ row }) => (
      <span>{row.original.userWallet?.totalLevelingBonus ?? 0}</span>
    ),
  },
  {
    header: "Challenge Income (TOIN)",
    cell: () => <span>-</span>,
  },
  {
    accessorKey: "totalToinCredit",
    header: "Total Credit (TOIN)",
    cell: ({ row }) => <span>{row.original.totalToinCredit ?? 0}</span>,
  },
  {
    accessorKey: "totalToinDebit",
    header: "Total debit (TOIN)",
    cell: ({ row }) => <span>{row.original.totalToinDebit ?? 0}</span>,
  },
  // {
  //   accessorKey: "totalUsdtCredit",
  //   header: "Total Credit USDT",
  //   cell: ({ row }) => <span>{row.original.totalUsdtCredit ?? 0}</span>,
  // },
  // {
  //   accessorKey: "totalUsdtDebit",
  //   header: "Total debit USDT",
  //   cell: ({ row }) => <span>{row.original.totalUsdtDebit ?? 0}</span>,
  // },
  {
    header: "Total transaction Charge (USDT)",
    cell: ({ row }) => <span>{row.original.totalPlatformFeeUsdt ?? 0}</span>,
  },
  {
    accessorFn: (row) => row.userWallet?.walletBalance,
    id: "walletBalance",
    header: "TOIN balance",
    cell: ({ row }) => (
      <span>{row.original.userWallet?.walletBalance ?? 0}</span>
    ),
  },
];
