"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TAddCategoryFormData } from "./CategorySchema";
import { Switch } from "@/components/ui/switch";

interface CategoryFormProps {
  form: UseFormReturn<TAddCategoryFormData>;
  onSubmit: (data: TAddCategoryFormData) => void;
  isLoading: boolean;
}

export default function CategoryForm({
  form,
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const { register, control, handleSubmit } = form;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        required
        labelClassName="text-base"
        {...register("name")}
        error={form.formState.errors.name?.message}
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
        disabled={isLoading}
        render={({ field }) => (
          <div className="flex items-center gap-3 mt-2">
            <label htmlFor="notifications" className="text-sm font-medium">
              Status:
            </label>

            <Switch
              className="cursor-pointer"
              checked={field.value}
              color={field.value ? "success" : "destructive"}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            />
          </div>
        )}
      />
    </form>
  );
}
