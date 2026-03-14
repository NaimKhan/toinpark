import { type ColumnDef } from "@tanstack/react-table";
import { type IDemoTableData } from "./data";
import { convertToNumber, checkIsNumber, multiply } from "js-utility-method";

export const columns: ColumnDef<IDemoTableData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <span>{row.getValue("age")}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span>
        {convertToNumber({
          value: row.getValue("price"),
          fallback: 0,
          digit: 2,
        })}
      </span>
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Test Method",
    cell: () => (
      <span>
        iSNumber: {checkIsNumber(20) ? "Yes" : "No"} <br /> multiply:{" "}
        {multiply(20, 20)}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
];
