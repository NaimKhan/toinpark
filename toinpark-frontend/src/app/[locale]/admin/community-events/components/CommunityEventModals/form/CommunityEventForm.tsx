"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Controller, UseFormReturn } from "react-hook-form";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileUploader from "@/components/feature/file-uploader";
import { TNullish } from "@/store/api/common-api-types";
import { TCommunityEventFormData } from "./communityEventSchema";
import CustomDatePicker from "@/components/date/CustomDatePicker";
import { TCommunityEvent } from "@/store/api/community-events/community-events.types";

interface Props {
  form: UseFormReturn<TCommunityEventFormData>;
  onSubmit: (data: TCommunityEventFormData) => void;
  getAEventData?: TCommunityEvent | TNullish;
}

export default function CommunityEventForm({
  form,
  onSubmit,
  getAEventData,
}: Props) {
  const [imgFiles, setImgFiles] = useState<File[]>([]);

  const { control, register } = form;

  return (
    <ScrollArea>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2 ">
        {/* Title */}
        <Input
          {...register("title")}
          placeholder="Title"
          label="Title"
          className="!h-12"
          required
          errorClassName="text-md"
          error={form.formState.errors.title?.message}
        />

        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => {
            const valueAsDate = field.value ? new Date(field.value) : null;
            return (
              <CustomDatePicker
                label="Event Date"
                showTimeSelect
                dateFormat="HH:mm MMMM d, yyyy"
                value={valueAsDate}
                onChange={(date) => {
                  field.onChange(date ? date.toISOString() : undefined);
                }}
                placeholder="Choose a date"
                error={form.formState.errors.eventDate?.message}
              />
            );
          }}
        />

        <Controller
          name="eventType"
          control={control}
          rules={{ required: "Please select a event type" }}
          render={({ field }) => (
            <LabelErrorWrapper
              label="Event Type"
              error={form.formState.errors.eventType?.message}
            >
              <Select
                onValueChange={field.onChange}
                defaultValue={getAEventData?.eventType || "CONFERENCE"}
              >
                <SelectTrigger
                  className="w-full !h-12"
                  error={
                    form.formState.errors.eventType?.message && "Select a Type"
                  }
                >
                  <SelectValue placeholder="Select a event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONFERENCE">CONFERENCE</SelectItem>
                  <SelectItem value="MEETUP">MEETUP</SelectItem>
                  <SelectItem value="WORKSHOP">WORKSHOP</SelectItem>
                  <SelectItem value="WEBINAR">WEBINAR</SelectItem>
                  <SelectItem value="NETWORKING">NETWORKING</SelectItem>
                  <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
              </Select>
            </LabelErrorWrapper>
          )}
        />
        <Input
          {...register("eventLink")}
          placeholder="Event Link"
          label="Event Link"
          className="!h-12"
          errorClassName="text-md"
          error={form.formState.errors.eventLink?.message}
        />
        <Input
          {...register("mapLink")}
          placeholder="Map Link"
          label="Map Link"
          className="!h-12"
          errorClassName="text-md"
          error={form.formState.errors.mapLink?.message}
        />
        <Input
          {...register("eventLocation")}
          placeholder="Event Location"
          label="Event Location"
          className="!h-12"
          errorClassName="text-md"
          error={form.formState.errors.eventLocation?.message}
        />

        {/* thumbnail image */}
        <FileUploader
          className="w-full"
          label="Select Thumbnail"
          files={imgFiles}
          setFiles={(files) => {
            setImgFiles(files);
            form.setValue("bannerImage", files?.[0] ?? undefined);
          }}
          isMultiple={false}
          fileUploadLabelText="PNG or JPG (max 5MB)"
          defaultImage={getAEventData?.media?.url}
          error={form.formState.errors.bannerImage?.message as string}
        />

        {/* Description */}
        <Textarea
          {...form.register("description")}
          placeholder="Description"
          className="col-span-2 w-full"
          error={form.formState.errors.description?.message}
          label="Description"
        />
      </form>
    </ScrollArea>
  );
}
