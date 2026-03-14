"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import { dummyKycLogs as data } from "./dummyData";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import RenderData from "@/components/feature/loader/RenderData";

export default function KycLogTable() {
  return (
    <DefaultTable data={data} columns={columns} className="text-default-100">
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full">
          <div className="flex-1">
            <DropDownMenu />
          </div>
          <div className="flex-none w-64 text-end ">
            <SearchComponent className="h-12" />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData expectedDataType="array" data={data}>
        <DefaultTable.Table />
        <DefaultTable.Footer></DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}
