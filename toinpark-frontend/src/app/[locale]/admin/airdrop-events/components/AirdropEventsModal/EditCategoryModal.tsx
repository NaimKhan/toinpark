"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import RenderData from "@/components/feature/loader/RenderData";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useAirdropForm } from "./AirdropEventForm/useAirdropForm";
import { TString } from "@/store/api/common-api-types";
import AirdropEventForm from "./AirdropEventForm";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditAAirdropEventModal({
  airdropEventId,
}: {
  airdropEventId: TString;
}) {
  const {
    form,
    open,
    setOpen,
    airdropData,
    getAAirdropEventApiState,
    handleConfirm,
    onSubmit,
    isUpdating,
  } = useAirdropForm({ airdropEventId: airdropEventId });

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
        title="Edit Airdrop Event"
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
              Cancel
            </Button>

            <SubmitButton
              onClick={handleConfirm}
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
              isLoading={isUpdating}
            >
              Update
            </SubmitButton>
          </>
        }
      >
        <RenderData
          expectedDataType="object"
          data={airdropData}
          {...getAAirdropEventApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <AirdropEventForm form={form} onSubmit={onSubmit} />
        </RenderData>
      </CustomDialog>
    </>
  );
}
