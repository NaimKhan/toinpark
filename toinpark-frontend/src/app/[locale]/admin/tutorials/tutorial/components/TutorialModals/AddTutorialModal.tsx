"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTutorialForm } from "./tutorialForm/useTutorialForm";
import TutorialForm from "./tutorialForm";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

export default function AddTutorialModal() {
  const [open, setOpen] = useState(false);

  const form = useTutorialForm({
    onSuccessClose: () => setOpen(false),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Tutorial</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        hideCancelBtn
        hideConfirmBtn
        title="Add New Tutorial"
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
              Submit
            </SubmitButton>
          </>
        }
      >
        <TutorialForm form={form} onSubmit={form.onSubmit} />
      </CustomDialog>
    </>
  );
}
