"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TString } from "@/store/api/common-api-types";
import InfoCard from "@/components/feature/cards/InfoCard";
import { useGetAAnnouncementCategoryQuery } from "@/store/api/announcement-categories/announcement-categories-api";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function ShowAnnouncementCategoryModal({
  announcementCategoryId,
}: {
  announcementCategoryId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: res, ...apiState } = useGetAAnnouncementCategoryQuery(
    { id: announcementCategoryId },
    {
      skip: !open,
    },
  );

  const announcementCategory = res?.data;

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
        title="Announcement Category Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[625px]"
      >
        <RenderData
          expectedDataType="object"
          data={announcementCategory}
          {...apiState}
          loadingSkeleton={<ContentLoader />}
        >
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="space-y-4">
              <InfoCard label="Name" value={announcementCategory?.name} />
              <InfoCard
                label="Description"
                value={
                  <p className="whitespace-pre-line">
                    {announcementCategory?.description}
                  </p>
                }
              />
              <InfoCard
                label="Status"
                value={
                  <span
                    className={`font-semibold ${
                      announcementCategory?.isActive
                        ? "text-success/80"
                        : "text-destructive/80"
                    }`}
                  >
                    {announcementCategory?.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
