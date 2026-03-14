import { type ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { TGetASubAdmin } from "@/store/api/sub-admin-management/sub-admin-management.types";
import StatusCell from "./StatusCell";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";

export const columns: ColumnDef<TGetASubAdmin>[] = [
  {
    accessorKey: crypto.randomUUID(),
    header: "S.No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row: { original } }) => (
      <span>
        {original?.userProfile?.firstName} {original?.userProfile?.lastName}
      </span>
    ),
  },
  {
    accessorKey: "userName",
    header: "Full Name",
    cell: ({ row }) => <span>{row.getValue("userName")}</span>,
    enableSorting: true,
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
    enableSorting: true,
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
