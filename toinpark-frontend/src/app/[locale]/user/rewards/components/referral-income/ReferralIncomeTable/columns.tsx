import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import { TTransactionSearch } from "@/store/api/user -transaction/user -transaction.type";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TTransactionSearch>[] = [
  {
    accessorKey: "serialNo",
    header: () => <div className="text-center leading-tight">S.No</div>,
    cell: TableSerialNumber,
    size: 40,
  },
  {
    accessorKey: "sponsorId",
    header: "Downline User ID",
    cell: ({ row: { original } }) => (
      <span>{original?.userStakingPackage?.user?.username || "-"}</span>
    ),
  },
  {
    accessorKey: "sponsorName",
    header: "Downline User Name",
    cell: ({ row: { original } }) => {
      const profile = original?.userStakingPackage?.user?.userProfile;
      const fullName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ");
      return <span className="capitalize">{fullName || "-"}</span>;
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row: { original } }) => (
      <span>
        {original?.referralLevel?.levelName === "Level-1"
          ? "Direct"
          : original?.referralLevel?.levelName || "-"}
      </span>
    ),
  },
  {
    accessorKey: "investment",
    header: "Investment",
    cell: ({ row: { original } }) => (
      <span>{original?.userStakingPackage?.toinAmount || "-"}</span>
    ),
  },
  {
    accessorKey: "grossCommission",
    header: "Commission (%)",
    cell: ({ row: { original } }) => (
      <span>{original?.referralLevel?.referralBonusPercentage ?? "0"}%</span>
    ),
  },
  {
    accessorKey: "netCommission",
    header: "Commission",
    cell: ({ row: { original } }) => (
      <span>{original?.toinAmount || "-"} </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Commission Date",
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
  },
];
