"use client";

import { useMemo } from "react";
import { useGetWithdrawalRequestsQuery } from "@/store/api/withdrawal-requests/withdrawal-requests-api";
import { convertUTCToLocal } from "@/lib/date-time/date-time";
import StatusBadge from "@/components/feature/status/StatusBadge";
import DefaultTable from "@/components/feature/table/DefaultTable";
import RenderData from "@/components/feature/loader/RenderData";
import { type ColumnDef } from "@tanstack/react-table";
import { TWithdrawalRequestItem } from "@/store/api/withdrawal-requests/withdrawal-requests.type";

export default function EarningsAndWithdrawalsCard() {
  const { data: withdrawalsRes, ...apiState } = useGetWithdrawalRequestsQuery({
    limit: 5,
    page: 1,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const withdrawals = withdrawalsRes?.data?.items || [];

  const columns = useMemo<ColumnDef<TWithdrawalRequestItem>[]>(
    () => [
      {
        header: "User ID",
        cell: ({ row }) => (
          <span className="text-primary">
            {row.original?.creator?.toinAccountNumber}
          </span>
        ),
      },
      {
        header: "User Name",
        cell: ({ row }) => <span>{row.original?.creator?.username}</span>,
      },
      {
        header: "Amount (USDT)",
        cell: ({ row }) => (
          <span className="font-semibold">
            {row.original?.amount.toLocaleString()}
          </span>
        ),
      },
      {
        header: "Requested Date",
        cell: ({ row }) => (
          <span>
            {convertUTCToLocal({
              utcDateTime: row.original?.createdAt,
            }) || "-"}
          </span>
        ),
      },
      {
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge status={row.original?.status.toLowerCase()} />
        ),
      },
    ],
    [],
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className="text-xl font-semibold">Latest Withdrawals</h3>
        {/* <Link href="/admin/principal-withdrawal-management/pending-withdrawal-request-usdt">
          <Button variant="default" className="text-primary p-0">
            View All
          </Button>
        </Link> */}
      </div>

      <RenderData
        data={withdrawals}
        expectedDataType="array"
        showEmptyState={false}
        {...apiState}
      >
        <DefaultTable
          data={withdrawals}
          columns={columns}
          className="bg-secondary/10 border-none shadow-none"
        >
          <DefaultTable.Table />
        </DefaultTable>
      </RenderData>
    </div>
  );
}
