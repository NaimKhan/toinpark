"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";
import { TTutorialFormData } from "./tutorialSchema";
import { useGetTutorialCategoriesQuery } from "@/store/api/tutorial-categories/tutorial-categories-api";
import RenderData from "@/components/feature/loader/RenderData";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import SelectDataNotFound from "@/components/dataNotFound/SelectDataNotFound";
import FileUploader from "@/components/feature/file-uploader";
import { TTutorialData } from "@/store/api/tutorials/tutorials.types";
import { TNullish } from "@/store/api/common-api-types";
import UploadFileIcon from "@/components/svg/UploadFileIcon";
import { Button } from "@/components/ui/button";
import CrossIcon from "@/components/svg/CrossIcon";

interface Props {
  form: UseFormReturn<TTutorialFormData>;
  onSubmit: (data: TTutorialFormData) => void;
  getATutorialData?: TTutorialData | TNullish;
}

export default function TutorialForm({
  form,
  onSubmit,
  getATutorialData,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<string | null | undefined>(
    getATutorialData?.videoMedia?.url,
  );

  const status = form.watch("type");
  const { data: TutorialCategoriesRes, ...getTutorialCategoriesApiState } =
    useGetTutorialCategoriesQuery();
  const tutorialCategoryData = TutorialCategoriesRes?.data?.items;

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-2 pb-5 !h-full pe-1"
      >
        {/* Title */}
        <Input
          {...form.register("title")}
          placeholder="Title"
          label="Title"
          className="!h-12"
          required
          errorClassName="text-md"
          error={form.formState.errors.title?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Name */}

          <LabelErrorWrapper
            required
            label="Category"
            error={form.formState.errors.tutorialCategoryId?.message}
            errorClassName="text-md"
          >
            <RenderData
              expectedDataType="array"
              data={tutorialCategoryData}
              {...getTutorialCategoriesApiState}
              loadingSkeleton={
                <SelectDataNotFound
                  className="w-full !h-12"
                  placeholder="Loading..."
                />
              }
              dataNotFoundUI={
                <SelectDataNotFound
                  className="w-full !h-12"
                  placeholder="No Category found"
                />
              }
            >
              <Select
                onValueChange={(value) =>
                  form.setValue("tutorialCategoryId", value)
                }
                defaultValue={getATutorialData?.tutorialCategoryId || ""}
              >
                <SelectTrigger
                  error={
                    form.formState.errors.tutorialCategoryId?.message &&
                    "Select a category"
                  }
                  className="w-full !h-12"
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  {tutorialCategoryData?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      <div className="max-w-[180px] md:max-w-[250px] truncate">
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </RenderData>
          </LabelErrorWrapper>

          {/* Select type */}
          <LabelErrorWrapper
            label="Type"
            error={form.formState.errors.type?.message}
            errorClassName="text-md"
          >
            <Select
              onValueChange={(value) =>
                form.setValue("type", value as "file" | "link")
              }
              defaultValue={getATutorialData?.type || "link"}
            >
              <SelectTrigger
                error={form.formState.errors.type?.message && "Select a Type"}
                className="w-full !h-12"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="file">File</SelectItem>
              </SelectContent>
            </Select>
          </LabelErrorWrapper>
        </div>

        {/* Conditional fields */}
        <div className="space-y-2">
          {status === "file" ? (
            <LabelErrorWrapper
              label="Select File"
              error={form.formState.errors.videoFile?.message as string}
              errorClassName="text-md"
              required={status === "file"}
            >
              {/* Existing Video */}
              {form.getValues("videoFile") === undefined && videoFile && (
                <div className="relative w-fit">
                  <video
                    controls
                    className="w-full rounded-md border"
                    src={videoFile}
                  />

                  <Button
                    size="icon"
                    color="destructive"
                    type="button"
                    onClick={() => {
                      form.setValue("videoFile", undefined);
                      form.setValue("videoFileUrl", null);
                      setVideoFile(null);
                    }}
                    className="flex-none absolute -right-1 -top-3 bg-destructive"
                  >
                    <CrossIcon className="size-4" />
                  </Button>
                </div>
              )}

              {/* File Upload */}
              <div className="mt-3">
                <div
                  className="w-full cursor-pointer rounded-md border border-border p-4 transition flex items-center justify-between"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent p-2">
                      <UploadFileIcon className="h-5 w-5 text-default-300" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {videoFile
                        ? "Change video file"
                        : "Click to upload video"}
                    </span>
                  </div>

                  {videoFile && (
                    <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {typeof videoFile === "string"
                        ? "Existing video"
                        : "New video selected"}
                    </span>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    form.setValue("videoFile", file);
                    setVideoFile(URL.createObjectURL(file));
                  }}
                />
              </div>
            </LabelErrorWrapper>
          ) : (
            <Input
              {...form.register("sourceLink")}
              type="url"
              placeholder="Source Link"
              label="Source Link"
              className="!h-12 break-words whitespace-pre-wrap resize-none"
              error={form.formState.errors.sourceLink?.message}
              required={status === "link"}
            />
          )}
        </div>

        {/* thumbnail image */}
        <div className="flex flex-col items-start mr-1 w-full">
          <LabelErrorWrapper
            label="Select Thumbnail"
            error={form.formState.errors.thumbnail?.message as string}
            errorClassName="text-md"
          >
            <FileUploader
              className="w-full"
              label=""
              files={imgFiles}
              setFiles={(files) => {
                setImgFiles(files);
                form.setValue("thumbnail", files?.[0] ?? undefined);
              }}
              isMultiple={false}
              defaultImage={getATutorialData?.thumbnailMedia?.url}
              onRemoveDefaultImage={() => {
                form.setValue("thumbnail", null);
              }}
              fileUploadLabelText="PNG or JPG (max 5MB)"
            />
          </LabelErrorWrapper>
        </div>

        {/* Description */}
        <Textarea
          {...form.register("description")}
          placeholder="Description"
          className="w-full max-w-full resize-none whitespace-pre-wrap break-all overflow-hidden"
          error={form.formState.errors.description?.message}
          label="Description"
        />

        {/* Featured
        <div className="flex items-center gap-3 py-2">
          <label htmlFor="isFeatured" className="text-sm font-medium">
            Featured Status:
          </label>
          <Switch
            id="isFeatured"
            checked={form.watch("isFeatured")}
            onCheckedChange={(value: boolean) =>
              form.setValue("isFeatured", Boolean(value))
            }
          />
          <span className="text-xs text-muted-foreground italic">
            (Shows this tutorial in featured section)
          </span>
        </div> */}
      </form>
    </>
  );
}
