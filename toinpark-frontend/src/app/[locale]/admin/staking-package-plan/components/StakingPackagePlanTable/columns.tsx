import { type ColumnDef } from "@tanstack/react-table";
import StatusCell from "./StatusCell";
import ActionCell from "./ActionCell";
import { TGetAStakingPackage } from "@/store/api/staking-package/staking-package.type";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertToNumber } from "js-utility-method";

export const columns: ColumnDef<TGetAStakingPackage>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: () => <div className="text-start leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[350px] truncate ps-3">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "dailyProfitPercent",
    header: "Daily Profit (%)",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("dailyProfitPercent"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "bonusAmount",
    header: "Bonus (TOIN)",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("bonusAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "minToinAmount",
    header: "Min TOIN",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("minToinAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "maxToinAmount",
    header: "Max TOIN",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("maxToinAmount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "minimumDurationInDays",
    header: "Minimum Maturity Period (Days)",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("minimumDurationInDays"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "recurringProfitDays",
    header: "Recurring Days",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("recurringProfitDays"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "totalToinStaked",
    header: "Total TOIN Purchase",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("totalToinStaked"),
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
