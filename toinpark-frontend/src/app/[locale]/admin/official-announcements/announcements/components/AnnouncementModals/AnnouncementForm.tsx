"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TAddAnnouncementFormData } from "./addAnnouncementSchema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAnnouncementCategoriesQuery } from "@/store/api/announcement-categories/announcement-categories-api";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { TNullish } from "@/store/api/common-api-types";
import { TOfficialAnnouncement } from "@/store/api/official-announcements/official-announcements.types";

interface AnnouncementFormProps {
  form: UseFormReturn<TAddAnnouncementFormData>;
  onSubmit: (data: TAddAnnouncementFormData) => void;
  announcementData?: TOfficialAnnouncement | TNullish;
}
export default function AnnouncementForm({
  form,
  onSubmit,
  announcementData,
}: AnnouncementFormProps) {
  const { register, control, handleSubmit } = form;
  const { data: AnnouncementCategoriesRes } = useGetAnnouncementCategoriesQuery(
    {
      limit: 300,
      isActive: true,
    },
  );

  const CategoriesData = AnnouncementCategoriesRes?.data?.items;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        labelClassName="text-base"
        {...register("title")}
        error={form.formState.errors.title?.message}
        required
      />

      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <LabelErrorWrapper
            label="Category"
            error={form.formState.errors.categoryId?.message}
            required
          >
            <Select
              onValueChange={field.onChange}
              defaultValue={announcementData?.categoryId || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {(CategoriesData?.length ?? 0 > 0)
                    ? CategoriesData?.map((category) => (
                        <SelectItem
                          value={category?.id ?? ""}
                          key={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    : "Create Category First"}
                </SelectGroup>
              </SelectContent>
            </Select>
          </LabelErrorWrapper>
        )}
      />

      <Controller
        name="audienceType"
        control={control}
        rules={{ required: "Please select a audience type" }}
        defaultValue={announcementData?.audienceType || "MEMBER"}
        render={({ field }) => (
          <LabelErrorWrapper
            label="Audience Type"
            error={form.formState.errors.audienceType?.message}
          >
            <Select
              onValueChange={field.onChange}
              defaultValue={announcementData?.audienceType || "MEMBER"}
            >
              <SelectTrigger
                className="w-full"
                error={
                  form.formState.errors.audienceType?.message && "Select a Type"
                }
              >
                <SelectValue placeholder="Select a audience type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="MEMBER">MEMBER</SelectItem>
                  <SelectItem value="SYSTEM_USER">SYSTEM USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </LabelErrorWrapper>
        )}
      />

      <Textarea
        label="Message"
        labelClassName="text-base"
        {...register("message")}
        error={form.formState.errors.message?.message}
        required
      />
    </form>
  );
}
