"use client";

import { ColumnDef } from "@tanstack/react-table";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";

export type TKycLog = {
  logId: string;
  changeType: string;
  oldValue: string;
  newValue: string;
  status: string;
  initiatedBy: string;
  requestedAt: string;
  node: string;
};

export const columns: ColumnDef<TKycLog>[] = [
  {
    accessorKey: "logId",
    header: "Log ID",
  },
  {
    accessorKey: "changeType",
    header: "Change Type",
  },
  {
    accessorKey: "oldValue",
    header: "Old Value",
    cell: ({ row }) => (
      <span className="text-default-200 line-through">
        {row.getValue("oldValue")}
      </span>
    ),
  },
  {
    accessorKey: "newValue",
    header: "New Value",
    cell: ({ row }) => (
      <span className="text-primary font-medium">
        {row.getValue("newValue")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={(row.getValue("status") as string) || "-"} />
    ),
  },
  {
    accessorKey: "initiatedBy",
    header: "Initiated By",
  },
  {
    accessorKey: "requestedAt",
    header: "Requested At",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.getValue("requestedAt"),
            format: "HH:mm",
          })}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.getValue("requestedAt"),
          })}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "verifiedAt",
    header: "Verified At",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-default-300">
          {convertUTCToLocal({
            utcDateTime: row.getValue("verifiedAt"),
            format: "HH:mm",
          })}
        </span>
        <span className="font-semibold text-default-100">
          {convertUTCToLocal({
            utcDateTime: row.getValue("verifiedAt"),
          })}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "node",
    header: "Node",
  },
];
