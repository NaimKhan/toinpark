"use client";

import { useState } from "react";
import { EyeIcon } from "lucide-react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import RenderData from "@/components/feature/loader/RenderData";
import { ScrollArea } from "@/components/ui/scroll-area";

import { TString } from "@/store/api/common-api-types";
import { useGetATutorialCategoryQuery } from "@/store/api/tutorial-categories/tutorial-categories-api";
import InfoCard from "@/components/feature/cards/InfoCard";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function ShowCategoryModal({
  categoryId,
}: {
  categoryId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { data: getTutorialCategoryRes, ...getTutorialCategoryApiState } =
    useGetATutorialCategoryQuery(
      { id: categoryId },
      {
        skip: !open,
      }
    );

  const tutorialCategory = getTutorialCategoryRes?.data;

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
        title="Category Details"
        titleClassName="text-xl font-semibold"
        hideConfirmBtn
        cancelBtnText="Close"
        className="sm:max-w-[625px]"
      >
        <RenderData
          expectedDataType="object"
          data={tutorialCategory}
          {...getTutorialCategoryApiState}
          loadingSkeleton={<ContentLoader className="min-h-[40vh]" />}
        >
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="space-y-4">
              {/* Name */}
              <InfoCard label="Name" value={tutorialCategory?.name} />

              {/* Status */}
              <InfoCard
                label="Status"
                value={
                  <span
                    className={`font-semibold ${
                      tutorialCategory?.isActive
                        ? "text-success/80"
                        : "text-destructive/80"
                    }`}
                  >
                    {tutorialCategory?.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />

              {/* Description */}
              {tutorialCategory?.description && (
                <InfoCard
                  label="Description"
                  value={
                    <p className="whitespace-pre-line">
                      {tutorialCategory?.description}
                    </p>
                  }
                />
              )}
            </div>
          </ScrollArea>
        </RenderData>
      </CustomDialog>
    </>
  );
}
