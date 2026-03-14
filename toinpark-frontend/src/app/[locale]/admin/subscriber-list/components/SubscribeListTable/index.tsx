"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import { data } from "./data";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";

function SubscribeListTable() {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-4 items-center py-4 ">
        <div className="flex-1">
          <DropDownMenu />
        </div>
        <div className="flex-none w-64 text-end">
          <SearchComponent className="h-12" />
        </div>
      </div>
      <DefaultTable data={data} columns={columns} className="text-default-100">
        <DefaultTable.Table />
      </DefaultTable>
    </>
  );
}

export default SubscribeListTable;
