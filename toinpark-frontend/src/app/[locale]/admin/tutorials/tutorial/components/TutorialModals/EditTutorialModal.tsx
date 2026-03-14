"use client";

import { useState } from "react";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import RenderData from "@/components/feature/loader/RenderData";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useTutorialForm } from "./tutorialForm/useTutorialForm";
import TutorialForm from "./tutorialForm";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { TString } from "@/store/api/common-api-types";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditTutorialModal({ id }: { id: TString }) {
  const [open, setOpen] = useState(false);

  const form = useTutorialForm({
    id,
    open,
    onSuccessClose: () => setOpen(false),
  });

  return (
    <>
      <CommonTooltip content="Edit">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Edit />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        hideCancelBtn
        hideConfirmBtn
        title="Edit Tutorial"
        className="sm:max-w-[625px]"
        customButtons={
          <>
            <Button
              variant="outline"
              color="destructive"
              className="flex-1 py-3"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <SubmitButton
              onClick={form.handleSubmit(form.onSubmit)}
              isLoading={form.isLoading}
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Update
            </SubmitButton>
          </>
        }
      >
        <RenderData
          expectedDataType="object"
          data={form.tutorialData}
          {...form.getTutorialApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <TutorialForm
            form={form}
            onSubmit={form.onSubmit}
            getATutorialData={form.tutorialData}
          />
        </RenderData>
      </CustomDialog>
    </>
  );
}
