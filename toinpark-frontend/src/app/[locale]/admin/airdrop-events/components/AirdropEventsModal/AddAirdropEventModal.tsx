"use client";

import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useAirdropForm } from "./AirdropEventForm/useAirdropForm";
import AirdropEventForm from "./AirdropEventForm";

export default function AddAirdropEventModal() {
  const { form, open, setOpen, handleConfirm, onSubmit, isCreating } =
    useAirdropForm();

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Airdrop Event</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Add Airdrop Event"
        titleClassName="text-xl"
        hideCancelBtn
        hideConfirmBtn
        className="sm:max-w-[625px]"
        customButtons={
          <>
            <Button
              variant="outline"
              color="destructive"
              className="flex-1 py-3"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>

            <SubmitButton
              onClick={handleConfirm}
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
              isLoading={isCreating}
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <AirdropEventForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
