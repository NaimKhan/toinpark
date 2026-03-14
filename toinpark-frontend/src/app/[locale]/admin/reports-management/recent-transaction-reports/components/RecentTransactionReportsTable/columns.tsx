import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TRecentTransaction } from "@/store/api/recent-transaction-reports/recent-transaction-reports.types";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TRecentTransaction>[] = [
  {
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => <span>{row.original?.user?.username || "-"}</span>,
  },
  {
    header: "Full Name",
    cell: ({ row }) => {
      const profile = row.original?.user?.userProfile;
      const fullName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ");
      return <span>{fullName || "-"}</span>;
    },
  },
  {
    accessorKey: "transactionAutoId",
    header: "Transaction ID",
    cell: ({ row }) => <span>{row.getValue("transactionAutoId") || "-"}</span>,
  },
  {
    accessorKey: "trxType",
    header: "Transaction Type",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("trxType") || "-"}</span>
    ),
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
  // {
  //   accessorKey: "toinBalanceAmount",
  //   header: "Balance",
  //   cell: ({ row }) => <span>{row.getValue("toinBalanceAmount") ?? "-"}</span>,
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.original?.createdAt,
            format: "HH:mm",
          }) || "-"}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.original?.createdAt,
          }) || "-"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "trxStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("trxStatus") as string;
      return <StatusBadge status={status || "-"} />;
    },
  },
];
