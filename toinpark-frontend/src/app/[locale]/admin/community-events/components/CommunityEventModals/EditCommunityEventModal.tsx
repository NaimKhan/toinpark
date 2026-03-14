"use client";

import { useEffect, useState } from "react";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";
import { TString } from "@/store/api/common-api-types";
import RenderData from "@/components/feature/loader/RenderData";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import CommunityEventForm from "./form/CommunityEventForm";
import { useCommunityEventForm } from "./form/useCommunityEventForm";
import { TCommunityEventFormData } from "./form/communityEventSchema";
import {
  useGetACommunityEventQuery,
  useUpdateCommunityEventMutation,
} from "@/store/api/community-events/community-events-api";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditCommunityEventModal({ id }: { id: TString }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: getACommunityEventRes, ...getAEventApiState } =
    useGetACommunityEventQuery(
      { id },
      {
        skip: !open,
      },
    );
  const getAEventData = getACommunityEventRes?.data;

  const [updateCommunityEvent, { isLoading }] =
    useUpdateCommunityEventMutation();

  const form = useCommunityEventForm();
  useEffect(() => {
    if (getAEventData) {
      form.reset({
        title: getAEventData?.title ?? "",
        eventType: getAEventData?.eventType ?? "CONFERENCE",
        bannerImage: getAEventData?.bannerImage ?? undefined,
        eventLink: getAEventData?.eventLink ?? "",
        eventDate: getAEventData?.eventDate ?? "",
        mapLink: getAEventData?.mapLink ?? "",
        description: getAEventData?.description ?? "",
        eventLocation: getAEventData?.eventLocation ?? "",
      });
    }
  }, [getAEventData, form]);
  const { reset } = form;
  const onSubmit = async (data: TCommunityEventFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the comunity event",
    });
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("eventType", data.eventType);

      if (data.eventDate) formData.append("eventDate", data.eventDate);
      if (data.bannerImage instanceof File) {
        formData.append("bannerImage", data.bannerImage);
      }
      if (data.mapLink) formData.append("mapLink", data.mapLink);
      if (data.eventLink) formData.append("eventLink", data.eventLink);
      if (data.description) formData.append("description", data.description);
      if (data.eventLocation)
        formData.append("eventLocation", data.eventLocation);

      await updateCommunityEvent({
        id,
        body: formData,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Community event updated successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update community event",
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
        title="Edit Community Event"
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
              Update
            </SubmitButton>
          </>
        }
      >
        <RenderData
          expectedDataType="object"
          data={getAEventData}
          {...getAEventApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <CommunityEventForm
            form={form}
            onSubmit={onSubmit}
            getAEventData={getAEventData}
          />
        </RenderData>
      </CustomDialog>
    </>
  );
}
