"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";

import CategoryForm from "./CategoryForm/CategoryForm";
import { useCategoryForm } from "./CategoryForm/useCategoryForm";

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);

  const form = useCategoryForm({
    onSuccessClose: () => setOpen(false),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Category</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        hideCancelBtn
        hideConfirmBtn
        title="Add Category"
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
              onClick={form.handleSubmit(form.onSubmit)}
              isLoading={form.isLoading}
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <CategoryForm form={form} onSubmit={form.onSubmit} isLoading={form.isLoading} />
      </CustomDialog>
    </>
  );
}
