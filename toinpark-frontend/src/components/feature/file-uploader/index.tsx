"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import FileActions from "./file-actions";
import FileList from "./file-list";
import FileUploaderLabel from "./file-uploader-label";
import ImageLoader from "./image-loader";
import type { IFileUploaderProps } from "./utils";
import Image from "next/image";
import CrossIcon from "@/components/svg/CrossIcon";
import { Button } from "@/components/ui/button";
function FileUploader({
  label,
  error,
  isLoading,
  files,
  setFiles,
  isMultiple = true,
  readonly,
  onDelete,
  acceptAllFiles = false,
  className,
  fileUploadLabelText,
  defaultImage,
  onRemoveDefaultImage,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/x-icon"],
}: //
IFileUploaderProps) {
  const [showExisting, setShowExisting] = useState(true);

  const shouldShowExisting =
    showExisting && defaultImage && (!files || files.length === 0);

  const dropzoneAccept = acceptAllFiles
    ? undefined
    : allowedTypes.reduce((acc, type) => {
        const ext = type.includes("/")
          ? `.${type.split("/")[1].replace("+xml", "").replace("+pdf", "")}`
          : "";
        acc[type] = [ext];
        return acc;
      }, {} as Record<string, string[]>);

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: isMultiple,
    accept: dropzoneAccept,
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptAllFiles
        ? acceptedFiles
        : acceptedFiles.filter((file) => allowedTypes.includes(file.type));

      // BLOCK disallowed files
      if (filteredFiles.length !== acceptedFiles.length) {
        alert("Some files were rejected — incorrect file type.");
      }

      setFiles([...(files || []), ...filteredFiles]);
    },
  });

  const handleRemoveFile = async (file: File) => {
    try {
      const filtered = files?.filter((i) => i.name !== file.name);
      setFiles?.(filtered || []);
      const res = await onDelete?.(file);
      if (res) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpdate = (index: number, newFile: File) => {
    const updatedFiles = [...(files || [])];
    updatedFiles[index] = newFile;
    setFiles(updatedFiles);
  };

  if (isLoading) {
    return <ImageLoader />;
  }

  return (
    <div className="w-full">
      {label && <Label htmlFor="files">{label}</Label>}

      {/* SHOW EXISTING IMAGE PREVIEW */}
      {shouldShowExisting ? (
        <div className="relative mb-4 h-[170px] rounded-md border border-border p-2 w-full flex items-center justify-center">
          <Button
            size="icon"
            color="destructive"
            type="button"
            onClick={() => {
              setShowExisting(false);
              setFiles?.([]);
              onRemoveDefaultImage?.();
            }}
            className="flex-none absolute -right-1 -top-3 bg-destructive"
          >
            <CrossIcon className="size-4" />
          </Button>

          <Image
            width={100}
            height={100}
            src={defaultImage}
            alt="Existing Thumbnail"
            className="h-full w-fit object-contain rounded-sm"
          />
        </div>
      ) : (
        <div {...getRootProps({ className: `dropzone ${className}` })}>
          {!readonly && <input {...getInputProps()} />}
          {files?.length ? null : (
            <FileUploaderLabel
              fileUploadLabelText={fileUploadLabelText}
              readonly={readonly}
            />
          )}
        </div>
      )}

      {files?.length ? (
        <div
          className={cn(
            "mt-4 rounded-md border border-border p-3",
            !isMultiple && "w-full p-0"
          )}
        >
          <FileList
            files={files}
            handleRemoveFile={handleRemoveFile}
            onFileUpdate={handleFileUpdate}
            isMultiple={isMultiple}
            singleFullWidth={!isMultiple}
            readonly={readonly}
            allowedTypes={allowedTypes}
          />

          {isMultiple && <FileActions setFiles={setFiles} open={open} />}
        </div>
      ) : null}

      {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
    </div>
  );
}

export default FileUploader;
