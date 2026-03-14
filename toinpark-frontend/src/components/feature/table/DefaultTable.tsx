"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

import CustomizedReactTable from "./CustomizedReactTable";
import FooterContainer from "./FooterContainer";
import TableProvider from "./TableProvider";
import TitleContainer from "./TitleContainer";

interface ReactTableProps<T extends object> {
  data: T[] | null | undefined;
  columns: ColumnDef<T>[];
  children?: React.ReactNode;
  className?: string;
}

function DefaultTable<T extends object>({
  data,
  columns,
  children,
  className,
}: ReactTableProps<T>) {
  const memorizedData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  const memorizedColumns = useMemo(() => columns, [columns]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border bg-default shadow-base2 custom-scrollbar ",
        className
      )}
    >
      <TableProvider<T> columns={memorizedColumns} data={memorizedData}>
        {children}
      </TableProvider>
    </div>
  );
}

DefaultTable.TitleContainer = TitleContainer;
DefaultTable.Table = CustomizedReactTable;
DefaultTable.Footer = FooterContainer;

export default DefaultTable;
