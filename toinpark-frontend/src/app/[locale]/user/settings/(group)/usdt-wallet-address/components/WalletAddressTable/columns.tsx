"use client";
import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { TWalletAddress } from "@/store/api/user-wallet-address/user-wallet-address.types";

export const columns: ColumnDef<TWalletAddress>[] = [
  {
    accessorKey: "name",
    header: "Label",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "walletAccountId",
    header: "Address",
    cell: ({ row }) => (
      <span
        className="truncate max-w-[300px] block"
        title={row.getValue("walletAccountId")}
      >
        {row.getValue("walletAccountId")}
      </span>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ActionCell,
    size: 100,
  },
];
