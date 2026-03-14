import { type ColumnDef } from "@tanstack/react-table";
import { TMember } from "@/store/api/members/members.types";
import StatusCell from "./StatusCell";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TMember>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "username",
    header: "User ID",
    cell: ({ row }) => <span>{row.getValue("username") || "-"}</span>,
  },
  {
    accessorKey: "userProfile",
    header: "Full Name",
    cell: ({ row }) => (
      <span>{`${row.original.userProfile.firstName} ${row.original.userProfile.lastName}`}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email") || "-"}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => <span>{row.getValue("phoneNumber") || "-"}</span>,
  },
  {
    accessorKey: "status",
    header: "Login Status",
    cell: StatusCell,
  },
];
