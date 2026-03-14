import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { TAirdropEvent } from "@/store/api/airdrop-events/airdrop-events.type";
import { convertToNumber } from "js-utility-method";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import FeaturesCell from "./FeaturesCell";

export const columns: ColumnDef<TAirdropEvent>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },

  {
    accessorKey: "eventName",
    header: "Event Name",
    enableSorting: true,
    cell: ({ row }) => <span>{row.getValue("eventName")}</span>,
  },

  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    enableSorting: true,
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("totalAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },

  {
    accessorKey: "usedAmount",
    header: "Used Amount",
    enableSorting: true,
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("usedAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },

  {
    id: "remainingAmount",
    header: "Remaining Amount",
    accessorFn: (row) => (row.totalAmount ?? 0) - (row.usedAmount ?? 0),
    enableSorting: true,
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("remainingAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },

  {
    accessorKey: crypto.randomUUID(),
    header: "Features",
    cell: FeaturesCell,
  },

  {
    accessorKey: "id",
    header: "Action",
    cell: ActionCell,
  },
];
