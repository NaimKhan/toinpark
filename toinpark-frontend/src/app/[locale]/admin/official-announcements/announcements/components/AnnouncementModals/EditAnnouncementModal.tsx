"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";
import { TString } from "@/store/api/common-api-types";
import RenderData from "@/components/feature/loader/RenderData";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import {
  addAnnouncementSchema,
  TAddAnnouncementFormData,
} from "./addAnnouncementSchema";
import AnnouncementForm from "./AnnouncementForm";
import {
  useGetAOfficialAnnouncementQuery,
  useUpdateOfficialAnnouncementMutation,
} from "@/store/api/official-announcements/official-announcements.api";
import { TCreateOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditAnnouncementModal({
  announcementId,
}: {
  announcementId: TString;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: getAOfficialAnnouncementRes,
    ...getAOfficialAnnouncementApiState
  } = useGetAOfficialAnnouncementQuery(
    { id: announcementId },
    {
      skip: !open,
    },
  );
  const announcementData = getAOfficialAnnouncementRes?.data;

  const [updateAnnouncement, { isLoading }] =
    useUpdateOfficialAnnouncementMutation();

  const form = useForm<TAddAnnouncementFormData>({
    resolver: zodResolver(addAnnouncementSchema),
    defaultValues: {
      title: "",
      message: "",
      categoryId: "",
      audienceType: "MEMBER",
      isActive: true,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (announcementData) {
      form.reset({
        title: announcementData.title || "",
        message: announcementData.message || "",
        categoryId: announcementData.categoryId || "",
        audienceType: announcementData.audienceType || "",
        isActive: announcementData.isActive ?? true,
      });
    }
  }, [announcementData, form]);

  const { reset } = form;
  const onSubmit = async (data: TAddAnnouncementFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the announcement",
    });
    try {
      const formData: TCreateOfficialAnnouncement = {
        title: data.title,
        message: data.message,
        categoryId: data.categoryId,
        audienceType: data.audienceType,
      };

      await updateAnnouncement({
        id: announcementId,
        body: formData,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Announcement updated successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Official Announcement Update Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update announcement",
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
        title="Edit Announcement"
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
          data={announcementData}
          {...getAOfficialAnnouncementApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <AnnouncementForm
            form={form}
            onSubmit={onSubmit}
            announcementData={announcementData}
          />
        </RenderData>
      </CustomDialog>
    </>
  );
}
