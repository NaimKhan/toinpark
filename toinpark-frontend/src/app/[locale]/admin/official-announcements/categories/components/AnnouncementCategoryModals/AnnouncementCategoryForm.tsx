"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TAddAnnouncementCategoryFormData } from "./addAnnouncementCategorySchema";
import { Switch } from "@/components/ui/switch";

interface CategoryFormProps {
  form: UseFormReturn<TAddAnnouncementCategoryFormData>;
  onSubmit: (data: TAddAnnouncementCategoryFormData) => void;
}

export default function AnnouncementCategoryForm({
  form,
  onSubmit,
}: CategoryFormProps) {
  const { register, control, handleSubmit } = form;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        labelClassName="text-base"
        {...register("name")}
        error={form.formState.errors.name?.message}
        required
      />

      <Textarea
        label="Description"
        labelClassName="text-base"
        {...register("description")}
        error={form.formState.errors.description?.message}
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-3 mt-2">
            <label htmlFor="notifications" className="text-sm font-medium">
              Status: {field.value ? "Active" : "Inactive"}
            </label>

            <Switch
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            />
          </div>
        )}
      />
    </form>
  );
}
