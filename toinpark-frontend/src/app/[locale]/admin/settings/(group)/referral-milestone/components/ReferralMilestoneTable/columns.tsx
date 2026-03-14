import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { TReferralMilestone } from "@/store/api/referral-milestone/referral-milestone.type";
import StatusCell from "./StatusCell";
import { convertToNumber } from "js-utility-method";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TReferralMilestone>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "referralName",
    header: "Referral Name",
    cell: ({ row }) => <span>{row.getValue("referralName")}</span>,
  },
  {
    accessorKey: "toinAmount",
    header: "Toin Amount",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("toinAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "targetPerson",
    header: "Target Person",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("targetPerson"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: ActionCell,
  },
];
