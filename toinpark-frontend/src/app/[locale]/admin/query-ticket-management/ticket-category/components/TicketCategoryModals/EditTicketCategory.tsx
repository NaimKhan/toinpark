"use client";

import { Button } from "@/components/ui/button";
import TicketCategoryForm from "./TicketCategoryForm";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Edit } from "lucide-react";
import { TString } from "@/store/api/common-api-types";
import { useState } from "react";
import { useTicketCategory } from "./TicketCategoryForm/useTicketCategory";
import CustomDialog from "@/components/popup/CustomDialog";

export default function EditTicketCategory({
  ticketId,
}: {
  ticketId: TString;
}) {
  const [open, setOpen] = useState(false);

  const { form, onSubmit, isLoading } = useTicketCategory({
    ticketId,
    open,
    onSuccess: () => setOpen(false),
  });

  return (
    <>
      <CommonTooltip content="Edit">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md h-10"
        >
          <Edit />
        </Button>
      </CommonTooltip>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title=">Edit Ticket Category"
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
              form="edit-ticket-category-form"
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
          formId="edit-ticket-category-form"
        />
      </CustomDialog>
    </>
  );
}
