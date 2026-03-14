"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MyTeamTable from "../MyTeamTable";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetReferralLevelsMemberQuery } from "@/store/api/referral-levels/referral-levels-api";
import { TGetReferralLevelsMemberArgs } from "@/store/api/referral-levels/referral-levels.types";
import RenderData from "@/components/feature/loader/RenderData";

function MyTeamAccordion() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetReferralLevelsMemberArgs, void>>();

  const { search, limit = 200 } = getAllParamValue() as {
    search?: string;
    limit?: number;
    page?: number;
  };

  const { data: getReferralLevelsRes, ...getReferralLevelsApiState } =
    useGetReferralLevelsMemberQuery({
      search: search,
      limit,
      sortOrder: "asc",
      sortBy: "createdAt",
    });
  const referralLevelsData = getReferralLevelsRes?.data?.items;

  return (
    <RenderData
      expectedDataType="array"
      data={referralLevelsData}
      showEmptyState={true}
      {...getReferralLevelsApiState}
    >
      <div className="border overflow-hidden rounded-lg w-full ">
        {referralLevelsData?.map((item) => (
          <Accordion key={item.id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="w-full border-b rounded-none text-base text-left px-6 py-8">
                {item.levelNumber === 1 ? "Direct Members" : "Level"}{" "}
                {item.levelNumber !== 1 ? item.levelNumber : ""}{" "}
                {`(${item.totalData})`}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <MyTeamTable levelId={item.id}/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </RenderData>
  );
}

export default MyTeamAccordion;
