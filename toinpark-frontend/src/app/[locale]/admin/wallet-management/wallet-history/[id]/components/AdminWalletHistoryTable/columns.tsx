import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import StatusBadge from "@/components/feature/status/StatusBadge";
import { TTransactionSearch } from "@/store/api/user -transaction/user -transaction.type";
import { convertUTCToLocal } from "@/lib/date-time/date-time";

export const columns: ColumnDef<TTransactionSearch>[] = [
  {
    accessorKey: "serialNo",
    header: () => <div className="text-center leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "transactionAutoId",
    header: "Transaction ID",
    cell: ({ row }) => <span>{row.getValue("transactionAutoId")}</span>,
  },
  {
    accessorKey: "trxType",
    header: "Transaction Type",
    cell: ({ row }) => <span>{row.getValue("trxType")}</span>,
  },
  {
    header: "Credit (TOIN)",
    cell: ({ row: { original } }) => (
      <span>
        {original?.amountType === "Credit" ? original?.toinAmount : "-"}
      </span>
    ),
  },
  {
    header: "Debit (TOIN)",
    cell: ({ row: { original } }) => (
      <span>
        {original?.amountType === "Debit" ? original?.toinAmount : "-"}
      </span>
    ),
  },
  {
    accessorKey: "toinBalanceAmount",
    header: "Balance",
    cell: ({ row }) => <span>{row.getValue("toinBalanceAmount")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.original.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.original.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "trxStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("trxStatus") as string;
      return <StatusBadge status={status} />;
    },
    enableSorting: true,
  },
];
