"use client";

import { type ColumnDef } from "@tanstack/react-table";
import TableSerialNumber from "@/components/feature/table/TableSerialNumber";
import { TDeductFundHistoryItem } from "@/store/api/admin-staking/admin-staking.types";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import StatusBadge from "@/components/feature/status/StatusBadge";

export const columns: ColumnDef<TDeductFundHistoryItem>[] = [
  {
    header: "Serial No",
    cell: TableSerialNumber,
  },
  {
    accessorKey: "user.toinAccountNumber",
    header: "User ID",
    cell: ({ row }) => (
      <span>{row.original.user.toinAccountNumber || "-"}</span>
    ),
  },
  {
    accessorKey: "user.fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return <span>{`${user.firstName} ${user.lastName || ""}`}</span>;
    },
  },
  {
    accessorKey: "adjustedBy.username",
    header: "Admin ID",
    cell: ({ row }) => <span>{row.original.adjustedBy.username || "-"}</span>,
  },
  {
    accessorKey: "adjustedBy.fullName",
    header: "Admin Name",
    cell: ({ row }) => {
      const adminProf = row.original.adjustedBy.userProfile;
      return (
        <span>
          {`${adminProf?.firstName ?? ""} ${adminProf?.lastName ?? ""}`.trim() ||
            row.original.adjustedBy.username}
        </span>
      );
    },
  },
  {
    accessorKey: "toinAmount",
    header: "Amount (TOIN)",
    cell: ({ row }) => <span>{row.original.toinAmount || "-"}</span>,
  },
  {
    accessorKey: "usdtAmount",
    header: "Amount (USDT)",
    cell: ({ row }) => <span>{row.original.usdtAmount || "-"}</span>,
  },
  {
    accessorKey: "transaction.trxStatus",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.transaction.trxStatus || "-"} />
    ),
  },
  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => {
      const remark = row.original.remark;
      if (!remark) return <span>-</span>;
      return (
        <CommonTooltip
          content={remark}
          contentClassName="max-w-[250px] text-base break-words"
        >
          <span className="text-start w-full ps-3 max-w-[250px] truncate line-clamp-1 cursor-help break-words">
            {remark}
          </span>
        </CommonTooltip>
      );
    },
  },
  {
    header: "Payment Type",
    cell: () => <span>-</span>,
  },
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
];
