import { type CellContext } from "@tanstack/react-table";

import useManageSearchParams from "@/hooks/useManageSearchParams";

import {
  TGetMyTickets,
  TGetMyTicketsArgs,
} from "@/store/api/tickets/tickets.types";

function PageNumber({ row }: CellContext<TGetMyTickets, unknown>) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetMyTicketsArgs, void | undefined>>();

  const { page, limit } = getAllParamValue();

  const currentPage = Number(page || 1);
  const rowIndex = row.index + 1;
  const pageSize = Number(limit || 10);

  const currentNo = (currentPage - 1) * pageSize + rowIndex;
  return <span className="text-center block w-12">{currentNo}</span>;
}

export default PageNumber;
