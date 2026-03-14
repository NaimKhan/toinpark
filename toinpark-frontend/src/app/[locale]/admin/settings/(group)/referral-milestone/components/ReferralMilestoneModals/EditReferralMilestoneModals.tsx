import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  referralMilestoneSchema,
  TAddReferralMilestoneFormData,
} from "./addReferralMilestoneModalSchema";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetAReferralMilestoneQuery,
  useUpdateReferralMilestoneMutation,
} from "@/store/api/referral-milestone/referral-milestone-api";
import { useEffect, useState } from "react";
import { TString } from "@/store/api/common-api-types";
import { TCreateReferralMilestone } from "@/store/api/referral-milestone/referral-milestone.type";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import RenderData from "@/components/feature/loader/RenderData";
import ReferralMilestoneModalForm from "./ReferralMilestoneModalForm";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditReferralMilestoneModals({
  referralId,
}: {
  referralId: TString;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: getAReferralMilestoneRes, ...getAReferralMilestoneApiState } =
    useGetAReferralMilestoneQuery(
      { id: referralId },
      {
        skip: !open,
      }
    );
  const referralMilestoneData = getAReferralMilestoneRes?.data;
  const [updateReferralMilestone, { isLoading }] =
    useUpdateReferralMilestoneMutation();

  const form = useForm<TAddReferralMilestoneFormData>({
    resolver: zodResolver(referralMilestoneSchema),
    defaultValues: {
      referralName: "",
      toinAmount: 0,
      targetPerson: 0,
      isActive: false,
    },
  });

  useEffect(() => {
    if (referralMilestoneData) {
      form.reset({
        referralName: referralMilestoneData.referralName || "",
        toinAmount: referralMilestoneData.toinAmount || 0,
        targetPerson: referralMilestoneData.targetPerson || 0,
        isActive: referralMilestoneData.isActive ?? true,
      });
    }
  }, [referralMilestoneData, form]);

  const { reset } = form;

  const onSubmit = async (data: TAddReferralMilestoneFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the Referral Milestone",
    });
    try {
      const formData: TCreateReferralMilestone = {
        referralName: data.referralName,
        toinAmount: data.toinAmount,
        targetPerson: data.targetPerson,
        isActive: data.isActive,
        perUserMilestone: 1,
      };

      await updateReferralMilestone({
        id: referralId,
        body: formData,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Referral Milestone has been updated successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Referral Milestone Update Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update Referral Milestone.",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit, () => {})();
  };

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
        onConfirm={handleConfirm}
        title="Edit Referral Milestone"
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
              onClick={() => {
                handleConfirm();
              }}
              isLoading={isLoading}
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <RenderData
          expectedDataType="object"
          data={referralId}
          {...getAReferralMilestoneApiState}
          loadingSkeleton={<ContentLoader className="min-h-[380px]" />}
        >
          <ReferralMilestoneModalForm form={form} onSubmit={onSubmit} />
        </RenderData>
      </CustomDialog>
    </>
  );
}
