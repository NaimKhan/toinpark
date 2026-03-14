"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import { useGetAAirdropEventQuery } from "@/store/api/airdrop-events/airdrop-events-api";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function ViewAirdropEventModal({
  airdropEventId,
}: {
  airdropEventId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: res, ...apiState } = useGetAAirdropEventQuery(
    { id: airdropEventId },
    {
      skip: !open,
    },
  );

  const airdropEvent = res?.data;

  return (
    <>
      <CommonTooltip content="View">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <EyeIcon />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Airdrop Event Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[650px]"
      >
        <RenderData
          expectedDataType="object"
          data={airdropEvent}
          {...apiState}
          loadingSkeleton={<ContentLoader />}
        >
          <ScrollArea className="max-h-[60vh] pr-2 mt-4">
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4">
                <InfoCard label="Event Name" value={airdropEvent?.eventName} />
                <InfoCard
                  label="Total Amount"
                  value={airdropEvent?.totalAmount?.toLocaleString()}
                />
                <InfoCard
                  label="Used Amount"
                  value={airdropEvent?.usedAmount?.toLocaleString()}
                />
                <InfoCard
                  label="Remaining Amount"
                  value={(
                    (airdropEvent?.totalAmount ?? 0) -
                    (airdropEvent?.usedAmount ?? 0)
                  ).toLocaleString()}
                />
                <InfoCard
                  label="Status"
                  className=""
                  value={
                    <span
                      className={`font-medium px-2 py-2 rounded-md text-sm flex items-center ${
                        airdropEvent?.isActive
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {airdropEvent?.isActive ? "Active" : "Inactive"}
                    </span>
                  }
                />
              </div>
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
