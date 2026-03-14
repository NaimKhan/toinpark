"use client";

import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

import StakingPackageForm from "./StakingPackageForm";
import { useStakingPackageForm } from "./StakingPackageForm/useStakingPackageForm";

export default function AddStakingPackageModal() {
  const { form, open, setOpen, handleConfirm, onSubmit, isLoading } =
    useStakingPackageForm();

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="px-4 md:px-6">
        Add Package
      </Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Add Staking Package"
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
              isLoading={isLoading}
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <StakingPackageForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
