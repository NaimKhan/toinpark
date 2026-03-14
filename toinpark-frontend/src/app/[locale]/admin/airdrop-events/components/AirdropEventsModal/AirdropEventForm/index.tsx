"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TAddAirdropEventFormData } from "./addAirdropEventModalSchema";

interface AirdropEventFormProps {
  form: UseFormReturn<TAddAirdropEventFormData>;
  onSubmit: (data: TAddAirdropEventFormData) => void;
}

export default function AirdropEventForm({
  form,
  onSubmit,
}: AirdropEventFormProps) {
  const { register, handleSubmit } = form;

  return (
    <form className="space-y-4 p-1" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        required
        placeholder="Event Name"
        label="Event Name"
        className="!h-12"
        {...register("eventName")}
        error={form.formState.errors.eventName?.message}
      />
      <Input
        type="number"
        required
        placeholder="Total Amount"
        label="Total Amount"
        className="!h-12"
        {...register("totalAmount", { valueAsNumber: true })}
        error={form.formState.errors.totalAmount?.message}
      />
    </form>
  );
}
