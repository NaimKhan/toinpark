import { type ColumnDef } from "@tanstack/react-table";
import { ISubscribeListTableData } from "./data";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<ISubscribeListTableData>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "emailId",
    header: "Email ID",
    cell: ({ row }) => <span>{row.getValue("emailId")}</span>,
  },
  {
    accessorKey: "dateAndTime",
    header: "Date & Time",
    cell: ({ row }) => <span>{row.getValue("dateAndTime")}</span>,
  },
];
