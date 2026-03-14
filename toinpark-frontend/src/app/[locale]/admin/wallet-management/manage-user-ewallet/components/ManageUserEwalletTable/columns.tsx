import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TMember } from "@/store/api/members/members.types";
import { Link } from "@/components/navigation";
import LoginWithUserId from "./LoginWithUserId";

export const columns: ColumnDef<TMember>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "username",
    header: "User ID",
    cell: LoginWithUserId,
  },
  {
    accessorKey: "userProfile",
    header: "Full Name",
    cell: ({ row }) => (
      <span>{`${row.original.userProfile.firstName} ${row.original.userProfile.lastName}`}</span>
    ),
  },
  {
    accessorKey: "userWallet",
    header: "TOIN Balance",
    cell: ({ row }) => <span>{row.original.userWallet?.walletBalance ?? 0}</span>,
  },
  {
    accessorKey: "manageWalletFund",
    header: "Manage Wallet Fund",
    cell: ({ row }) => (
      <span className="flex items-center justify-end gap-4">
        <Link
          href={`/admin/wallet-management/manage-wallet`}
          className="text-primary"
        >
          Manage
        </Link>
        <Link
          href={`/admin/wallet-management/wallet-history/${row.original.id}`}
          className="text-primary"
        >
          History
        </Link>
      </span>
    ),
  },
];
