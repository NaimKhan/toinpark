"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { data } from "./data";
import { columns } from "./columns";

function DemoTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default DemoTable;
