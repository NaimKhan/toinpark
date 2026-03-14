"use client";

import React, { useMemo, useState } from "react";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { TUserStakingPackageItem } from "@/store/api/user-staking-package/user-staking-package.type";
import { Badge } from "@/components/ui/badge";
import { getTransactionStatusColor } from "@/lib/status-colors/transactionBadgeColor";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import DefaultTable from "@/components/feature/table/DefaultTable";
import { ColumnDef } from "@tanstack/react-table";

interface HistoryModalProps {
  data: TUserStakingPackageItem;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "transactionAutoId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <span className="font-mono text-default-300">
            #{row.original.transactionAutoId}
          </span>
        ),
      },
      {
        accessorKey: "trxType",
        header: "Type",
        cell: ({ row }) => (
          <span className="capitalize text-default-200">
            {row.original.trxType.toLowerCase()}
          </span>
        ),
      },
      {
        accessorKey: "initiatedBy",
        header: "Initiated by",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
          >
            {row.original.trxType === "STAKE" ? "Admin" : "User"}
          </Badge>
        ),
      },
      {
        accessorKey: "usdtAmount",
        header: "Amount (USDT)",
        cell: ({ row }) => (
          <span className="text-default-200">{row.original.usdtAmount}</span>
        ),
      },
      {
        accessorKey: "toinAmount",
        header: "Amount (TOIN)",
        cell: ({ row }) => (
          <span className="text-default-200">{row.original.toinAmount}</span>
        ),
      },
      {
        accessorKey: "balanceUsdt",
        header: "Balance (USDT)",
        cell: () => <span className="text-default-200">-</span>,
      },
      {
        accessorKey: "balanceToin",
        header: "Balance (TOIN)",
        cell: () => <span className="text-default-200">-</span>,
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-default-300">
            {convertUTCToLocal({
              utcDateTime: row.original.createdAt,
            })}
          </span>
        ),
      },
      {
        accessorKey: "trxStatus",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={
              getTransactionStatusColor(row.original.trxStatus) +
              " text-[10px] px-2 py-0.5 font-medium"
            }
          >
            {row.original.trxStatus}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Button
        onClick={handleOpen}
        size="sm"
        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-all duration-300"
      >
        History
      </Button>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title="Staking Details & History"
        className="sm:max-w-[1000px] bg-[#0A0A0A] border-primary/20"
        hideConfirmBtn
        hideCancelBtn
      >
        <div className="space-y-6 py-4 w-full sm:max-w-[960px]">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-primary/10 p-4 rounded-lg bg-primary/5">
            <div className="flex flex-col gap-1">
              <span className="text-default-400 text-sm">Staking ID</span>
              <span className="text-default-100 font-medium font-mono">
                #{data.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-default-400 text-sm">Package</span>
              <span className="text-default-100 font-medium">
                {data.package.name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-default-400 text-sm">Staked Amount</span>
              <span className="text-default-100 font-medium">
                {data.usdtAmount} USDT
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-default-400 text-sm">Principal TOIN</span>
              <span className="text-default-100 font-medium">
                {data.toinAmount} TOIN
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-default-400 text-sm">Current Balance</span>
              <span className="text-primary font-bold">
                {data.toinBalanceAmount} TOIN ({data.usdtBalanceAmount} USDT)
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-default-100">
              Staking History
            </h3>
            <DefaultTable
              data={data.transactions || []}
              columns={columns}
              className="border-primary/10"
            >
              <DefaultTable.Table />
            </DefaultTable>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};

export default HistoryModal;
