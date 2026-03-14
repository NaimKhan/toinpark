import { type ColumnDef } from "@tanstack/react-table";
import { IAllPackageTableData } from "./data";
import EditButton from "./EditButton";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<IAllPackageTableData>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
    cell: ({ row }) => <span>{row.getValue("packageName")}</span>,
  },
  {
    accessorKey: "minimumAmount",
    header: "Minimum Amount",
    cell: ({ row }) => <span>{row.getValue("minimumAmount")}</span>,
  },
  {
    accessorKey: "maximumAmount",
    header: "Maximum Amount",
    cell: ({ row }) => <span>{row.getValue("maximumAmount")}</span>,
  },
  {
    accessorKey: "dailyProfit",
    header: "Daily Profit (%)",
    cell: ({ row }) => <span>{row.getValue("dailyProfit")}</span>,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Edit",
    cell: EditButton,
  },
];
