"use client";

import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import StakingPackageForm from "./StakingPackageForm";
import { TString } from "@/store/api/common-api-types";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Edit } from "lucide-react";
import { useStakingPackageForm } from "./StakingPackageForm/useStakingPackageForm";

export default function EditStakingPackageModal({
  stakingPackageId,
}: {
  stakingPackageId: TString;
}) {
  const { form, open, setOpen, handleConfirm, onSubmit, isLoading } =
    useStakingPackageForm({ stakingPackageId: stakingPackageId });

  return (
    <div>
      <CommonTooltip content="Edit">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10"
        >
          <Edit />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Edit Staking Package"
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
