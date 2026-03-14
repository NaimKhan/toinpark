"use client";
import { useState } from "react";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import { useGetAOfficialAnnouncementQuery } from "@/store/api/official-announcements/official-announcements.api";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import Loader from "@/components/feature/loader/loader";

export default function ShowAnnouncementModal({
  announcementId,
}: {
  announcementId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: res, ...apiState } = useGetAOfficialAnnouncementQuery(
    { id: announcementId },
    {
      skip: !open,
    }
  );

  const announcement = res?.data;

  return (
    <>
      <CommonTooltip content="View">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="bg-transparent hover:bg-transparent p-3.5 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          View
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Announcement Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[625px]"
      >
        <RenderData
          expectedDataType="object"
          data={announcement}
          {...apiState}
          loadingSkeleton={<Loader />}
        >
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="space-y-4">
              <InfoCard label="Title" value={announcement?.title} />
              <InfoCard
                label="Message"
                value={
                  <p className="whitespace-pre-line">{announcement?.message}</p>
                }
              />
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
