"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  addAnnouncementCategorySchema,
  TAddAnnouncementCategoryFormData,
} from "./addAnnouncementCategorySchema";
import CategoryForm from "./AnnouncementCategoryForm";
import { Edit } from "lucide-react";
import { TString } from "@/store/api/common-api-types";
import RenderData from "@/components/feature/loader/RenderData";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import {
  useGetAAnnouncementCategoryQuery,
  useUpdateAnnouncementCategoryMutation,
} from "@/store/api/announcement-categories/announcement-categories-api";
import { TCreateAnnouncementCategory } from "@/store/api/announcement-categories/announcement-categories.types";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditAnnouncementCategoryModal({
  announcementCategoryId,
}: {
  announcementCategoryId: TString;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: getAAnnouncementCategoryRes,
    ...getAAnnouncementCategoryApiState
  } = useGetAAnnouncementCategoryQuery(
    { id: announcementCategoryId },
    {
      skip: !open,
    },
  );
  const categoryData = getAAnnouncementCategoryRes?.data;

  const [updateAnnouncementCategory, { isLoading }] =
    useUpdateAnnouncementCategoryMutation();

  const form = useForm<TAddAnnouncementCategoryFormData>({
    resolver: zodResolver(addAnnouncementCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (categoryData) {
      form.reset({
        name: categoryData.name || "",
        description: categoryData.description || "",
        isActive: categoryData.isActive ?? true,
      });
    }
  }, [categoryData, form]);
  const { reset } = form;
  const onSubmit = async (data: TAddAnnouncementCategoryFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the announcement category",
    });
    try {
      const formData: TCreateAnnouncementCategory = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
      };

      await updateAnnouncementCategory({
        id: announcementCategoryId,
        body: formData,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Announcement Category has been updated successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Announcement Category Update Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to update announcement category",
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
        title="Edit Announcement Category"
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
          data={categoryData}
          {...getAAnnouncementCategoryApiState}
          loadingSkeleton={<ContentLoader />}
        >
          <CategoryForm form={form} onSubmit={onSubmit} />
        </RenderData>
      </CustomDialog>
    </>
  );
}
