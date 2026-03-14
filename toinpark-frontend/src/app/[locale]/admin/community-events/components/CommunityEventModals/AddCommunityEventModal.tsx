"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { useCreateCommunityEventMutation } from "@/store/api/community-events/community-events-api";
import CommunityEventForm from "./form/CommunityEventForm";
import { TCommunityEventFormData } from "./form/communityEventSchema";
import { useCommunityEventForm } from "./form/useCommunityEventForm";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

export default function AddTutorialModal() {
  const [open, setOpen] = useState(false);
  const [createCommunityEvent, { isLoading }] =
    useCreateCommunityEventMutation();
  const { toast } = useToast();

  const form = useCommunityEventForm();
  const { reset } = form;

  const onSubmit = async (data: TCommunityEventFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add the comunity event",
    });
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("eventType", data.eventType);

      if (data.eventDate) formData.append("eventDate", data.eventDate);
      if (data.bannerImage) formData.append("bannerImage", data.bannerImage);
      if (data.mapLink) formData.append("mapLink", data.mapLink);
      if (data.eventLink) formData.append("eventLink", data.eventLink);
      if (data.description) formData.append("description", data.description);
      if (data.eventLocation)
        formData.append("eventLocation", data.eventLocation);

      await createCommunityEvent(formData).unwrap();
      console.log(data.eventDate);
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Community event added successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Community Event Added Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add community event",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Event</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Add New Community Event"
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
        <CommunityEventForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
