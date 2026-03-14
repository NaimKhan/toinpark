"use client";

import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TTicketCategoryForm } from "./ticketCategorySchema";

export default function TicketCategoryForm({
  form,
  onSubmit,
  formId,
}: {
  form: UseFormReturn<TTicketCategoryForm>;
  onSubmit: (data: TTicketCategoryForm) => void;
  formId: string;
}) {
  const { register, handleSubmit } = form;

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 mt-4 px-1"
    >
      <div className="col-span-2">
        <Input
          {...register("name")}
          required
          label="Category Name"
          placeholder="Category Name"
          className="!h-12"
          error={form.formState.errors.name?.message}
        />
      </div>
    </form>
  );
}
