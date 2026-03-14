"use client";

import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import TicketCategoryForm from "./TicketCategoryForm";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useState } from "react";
import { useTicketCategory } from "./TicketCategoryForm/useTicketCategory";

export default function AddTicketCategory() {
  const [open, setOpen] = useState(false);

  const { form, onSubmit, isLoading } = useTicketCategory({
    onSuccess: () => setOpen(false),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Ticket Category</Button>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add New Ticket Category"
        className="sm:max-w-[625px]"
        hideCancelBtn
        hideConfirmBtn
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
              form="ticket-category-form"
              type="submit"
              isLoading={isLoading}
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Save
            </SubmitButton>
          </>
        }
      >
        <TicketCategoryForm
          form={form}
          onSubmit={onSubmit}
          formId="ticket-category-form"
        />
      </CustomDialog>
    </>
  );
}
