import { type CellContext } from "@tanstack/react-table";

import useManageSearchParams from "@/hooks/useManageSearchParams";

function TableSerialNumber<TData>({ row }: CellContext<TData, unknown>) {
  const { getAllParamValue } = useManageSearchParams();

  const { page, limit } = getAllParamValue();

  const currentPage = Number(page || 1);
  const rowIndex = row.index + 1;
  const pageSize = limit ? Number(limit) : 10;

  const currentNo = (currentPage - 1) * pageSize + rowIndex;
  return (
    <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
      {currentNo}
    </span>
  );
}

export default TableSerialNumber;
