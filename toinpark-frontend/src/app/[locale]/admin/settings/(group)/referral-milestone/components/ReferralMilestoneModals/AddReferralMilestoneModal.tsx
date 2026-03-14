"use client";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCreateReferralMilestoneMutation } from "@/store/api/referral-milestone/referral-milestone-api";
import { TCreateReferralMilestone } from "@/store/api/referral-milestone/referral-milestone.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  referralMilestoneSchema,
  TAddReferralMilestoneFormData,
} from "./addReferralMilestoneModalSchema";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import ReferralMilestoneModalForm from "./ReferralMilestoneModalForm";
import GradientText from "@/components/feature/text/gradientText";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

export default function AddReferralMilestoneModals() {
  const [open, setOpen] = useState(false);
  const [createReferralMilestone] = useCreateReferralMilestoneMutation();
  const { toast } = useToast();

  const form = useForm<TAddReferralMilestoneFormData>({
    resolver: zodResolver(referralMilestoneSchema),
    defaultValues: {
      referralName: "",
      toinAmount: 0,
      targetPerson: 0,
      isActive: true,
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = async (data: TAddReferralMilestoneFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add the Referral Milestone",
    });
    try {
      const formData: TCreateReferralMilestone = {
        referralName: data.referralName,
        toinAmount: data.toinAmount,
        targetPerson: data.targetPerson,
        isActive: data.isActive,
        perUserMilestone: 1,
      };
      console.log("Submitted Data:", formData);
      await createReferralMilestone(formData).unwrap();
      toastId.update({
        variant: "success",
        id: toastId.id,
        title: "Success",
        description: "Your Referral Milestone has been created and saved successfully.",
      });

      reset();
      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add Referral Milestone.",
      });
    }
  };

  return (
    <div className="flex justify-end items-center">
      <div className="text-default-100 w-full flex gap-4 items-center justify-between p-4 bg-border/50 flex-wrap">
        <GradientText
          label="Referral Milestones"
          className="text-xl font-semibold whitespace-nowrap"
        />
        <Button onClick={() => setOpen(true)} className="h-10 text-sm">
          Add Referral Milestone
        </Button>
      </div>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add Referral Milestone"
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
              Cancel
            </Button>
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <ReferralMilestoneModalForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
