"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import SubmitButton from "@/components/feature/buttons/SubmitButton";
import {
  addAnnouncementSchema,
  TAddAnnouncementFormData,
} from "./addAnnouncementSchema";
import { TCreateOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";
import AnnouncementForm from "./AnnouncementForm";
import { useCreateOfficialAnnouncementMutation } from "@/store/api/official-announcements/official-announcements.api";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

export default function AddAnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [createAnnouncement, { isLoading }] =
    useCreateOfficialAnnouncementMutation();
  const { toast } = useToast();

  const form = useForm<TAddAnnouncementFormData>({
    resolver: zodResolver(addAnnouncementSchema),
    defaultValues: {
      title: "",
      message: "",
      categoryId: "",
      audienceType: "MEMBER",
      isActive: true,
    },
  });

  const { reset } = form;
  const onSubmit = async (data: TAddAnnouncementFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add the announcement",
    });
    try {
      const formData: TCreateOfficialAnnouncement = {
        title: data.title,
        message: data.message,
        categoryId: data.categoryId,
        audienceType: data.audienceType,
      };

      await createAnnouncement(formData).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Announcement added successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Official Announcement Added Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add announcement",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit, () => {})();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Announcement</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Add Announcement"
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
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
              isLoading={isLoading}
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <AnnouncementForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
