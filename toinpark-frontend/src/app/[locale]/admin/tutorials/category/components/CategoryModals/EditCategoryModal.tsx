"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import RenderData from "@/components/feature/loader/RenderData";
import { Edit } from "lucide-react";

import CategoryForm from "./CategoryForm/CategoryForm";
import { TString } from "@/store/api/common-api-types";
import { useCategoryForm } from "./CategoryForm/useCategoryForm";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditCategoryModal({
  categoryId,
}: {
  categoryId: TString;
}) {
  const [open, setOpen] = useState(false);

  const form = useCategoryForm({
    id: categoryId,
    open,
    onSuccessClose: () => setOpen(false),
  });

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
        hideCancelBtn
        hideConfirmBtn
        title="Edit Category"
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
        <RenderData
          expectedDataType="object"
          data={form.categoryData}
          {...form.getOneApiState}
          loadingSkeleton={<ContentLoader className="min-h-[40vh]" />}
        >
          <CategoryForm
            form={form}
            onSubmit={form.onSubmit}
            isLoading={form.isLoading}
          />
        </RenderData>
      </CustomDialog>
    </>
  );
}
