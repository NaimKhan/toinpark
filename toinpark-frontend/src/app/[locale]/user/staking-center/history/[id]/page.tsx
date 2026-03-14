"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useGetStakingPackageByIdQuery } from "@/store/api/user-staking-package/user-staking-package-api";
import RenderData from "@/components/feature/loader/RenderData";
import { Badge } from "@/components/ui/badge";
import { getTransactionStatusColor } from "@/lib/status-colors/transactionBadgeColor";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import DefaultTable from "@/components/feature/table/DefaultTable";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import StatusBadge from "@/components/feature/status/StatusBadge";

const StakingHistoryDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const { data: res, ...apiState } = useGetStakingPackageByIdQuery(id);
  const data = res?.data;
  const locale = useDefaultLocale();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "transactionAutoId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <span className="font-medium text-default-100">
            {row.original.transactionAutoId}
          </span>
        ),
      },
      {
        accessorKey: "trxType",
        header: "Type",
        cell: ({ row }) => (
          <span className="capitalize text-default-100">
            {row.original.trxType.toLowerCase()}
          </span>
        ),
      },
      {
        accessorKey: "usdtAmount",
        header: "Amount (USDT)",
        cell: ({ row }) => (
          <span className="text-default-100">{row.original.usdtAmount}</span>
        ),
      },
      {
        accessorKey: "toinAmount",
        header: "Amount (TOIN)",
        cell: ({ row }) => (
          <span className="text-default-100">{row.original.toinAmount}</span>
        ),
      },
      {
        accessorKey: "balanceUsdt",
        header: "Balance (USDT)",
        cell: ({ row }) => (
          <span className="text-default-100">
            {row.original.usdtBalanceAmount}
          </span>
        ),
      },
      {
        accessorKey: "balanceToin",
        header: "Balance (TOIN)",
        cell: ({ row }) => (
          <span className="text-default-100">
            {row.original.toinBalanceAmount}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
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
      {
        accessorKey: "trxStatus",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge status={row.original.trxStatus} />
        ),
      },
    ],
    [],
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col items-start gap-4">
        <Link href={`/${locale}/user/staking-center?tab=%22history%22`}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-transparent hover:text-default-100 text-default-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-default-100">
          Staking Details & History
        </h1>
      </div>

      <RenderData
        data={data}
        expectedDataType="object"
        showEmptyState={true}
        {...apiState}
      >
        {data && (
          <div className="space-y-6">
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-primary/10 p-4 rounded-lg bg-primary/5">
              <div className="flex flex-col gap-1">
                <span className="text-default-400 text-sm">Package</span>
                <span className="text-default-100 font-medium">
                  {data?.package?.name}
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
                <span className="text-default-400 text-sm">
                  Current Balance
                </span>
                <span className="text-primary font-bold">
                  {data.toinBalanceAmount} TOIN ({data.usdtBalanceAmount} USDT)
                </span>
              </div>
            </div>

            {/* Table Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-default-100">
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
        )}
      </RenderData>
    </div>
  );
};

export default StakingHistoryDetailsPage;
