"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  addAnnouncementCategorySchema,
  TAddAnnouncementCategoryFormData,
} from "./addAnnouncementCategorySchema";
import { useToast } from "@/components/ui/use-toast";

import CategoryForm from "./AnnouncementCategoryForm";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useCreateAnnouncementCategoryMutation } from "@/store/api/announcement-categories/announcement-categories-api";
import { TCreateAnnouncementCategory } from "@/store/api/announcement-categories/announcement-categories.types";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";

export default function AddAnnouncementCategoryModal() {
  const [open, setOpen] = useState(false);
  const [createAnnouncementCategory, { isLoading }] =
    useCreateAnnouncementCategoryMutation();
  const { toast } = useToast();

  const form = useForm<TAddAnnouncementCategoryFormData>({
    resolver: zodResolver(addAnnouncementCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  const { reset } = form;
  const onSubmit = async (data: TAddAnnouncementCategoryFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add the announcement category",
    });
    try {
      const formData: TCreateAnnouncementCategory = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
      };

      await createAnnouncementCategory(formData).unwrap();
      toastId.update({
        variant: "success",
        id: toastId.id,
        title: "Success",
        description: "Announcement category added successfully",
      });

      reset();
      setOpen(false);
    } catch (error) {
      console.info("Announcement Category Added Failed:", error);
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description:
          getApiMessage(error) || "Failed to add announcement category",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit, () => {})();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Category</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Add Announcement Category"
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
        <CategoryForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
