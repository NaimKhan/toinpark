"use client";

import SubmitButton from "@/components/feature/buttons/SubmitButton";
import FileUploader from "@/components/feature/file-uploader";
import RenderData from "@/components/feature/loader/RenderData";
import { useToast } from "@/components/ui/use-toast";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";
import { useUpdateAGeneralSettingsMutation } from "@/store/api/system-settings/system-settings-api";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function WhitePaperPDFForm() {
  const { toast } = useToast();
  const [pdfFile, setPdfFiles] = useState<File[]>([]);

  const { getSystemSettings, getSystemSettingsApiState } =
    useGetSystemSettings();

  const [updateGeneralSetting, { isLoading }] =
    useUpdateAGeneralSettingsMutation();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      pdf: undefined as File | undefined,
    },
  });

  const onSubmit = async (data: any) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const formData = new FormData();

      if (data.pdf instanceof File) {
        formData.append("pdf", data.pdf);
      }

      const response = await updateGeneralSetting({ body: formData }).unwrap();
      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: "PDF uploaded successfully.",
      });

      setPdfFiles([]);
      setValue("pdf", undefined);
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update PDF.",
      });
    }
  };

  return (
    <div className="space-y-6 text-default-100">
      <RenderData
        expectedDataType="object"
        data={getSystemSettings?.pdfMedia}
        dataNotFoundTitle="No PDF uploaded yet."
        dataNotFoundSubtitle="Sorry, we could not find any PDF."
        {...getSystemSettingsApiState}
      >
        <div className="p-4 bg-muted rounded-lg border border-border-secondary flex flex-col gap-5 items-center justify-between">
          <div className="space-y-1 w-full">
            <p className="font-medium text-white">Current PDF:</p>
            <embed
              src={getSystemSettings?.pdfMedia?.url}
              type="application/pdf"
              className="w-full h-64 rounded-md border border-border-secondary"
            />
          </div>
        </div>
      </RenderData>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("pdf")} />

        <FileUploader
          className="w-full"
          label="Update White Paper PDF"
          files={pdfFile}
          setFiles={(files) => {
            setPdfFiles(files);
            setValue("pdf", files?.[0] ?? undefined);
          }}
          onRemoveDefaultImage={() => {
            setValue("pdf", undefined);
          }}
          isMultiple={false}
          allowedTypes={["application/pdf"]}
          fileUploadLabelText="Upload PDF (max 10MB)"
        />

        <SubmitButton
          isLoading={isLoading}
          disabled={pdfFile.length === 0}
          className="px-4 py-2 w-full"
        >
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}
