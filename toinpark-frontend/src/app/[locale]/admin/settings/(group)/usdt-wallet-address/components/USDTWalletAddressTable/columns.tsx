import { type ColumnDef } from "@tanstack/react-table";
import { IUSDTWalletAddressTableData } from "./data";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import EditUSDTWalletAddressModal from "../USDTWalletAddressModal/EditUSDTWalletAddressModal";
import Image from "next/image";

export const columns: ColumnDef<IUSDTWalletAddressTableData>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: () => <div className="text-start leading-tight">S.No</div>,
    cell: TableSerialNumber,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "walletAddress",
    header: "Wallet Address",
    cell: ({ row }) => <span>{row.getValue("walletAddress")}</span>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        width={100}
        height={100}
        src={row.getValue("image")}
        alt=""
        className="w-30 "
      />
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: EditUSDTWalletAddressModal,
  },
];
