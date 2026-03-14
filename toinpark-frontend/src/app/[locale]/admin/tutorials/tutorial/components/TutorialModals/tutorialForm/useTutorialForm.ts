"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TTutorialFormData, tutorialSchema } from "./tutorialSchema";

import {
  useGetATutorialQuery,
  useCreateTutorialsMutation,
  useUpdateTutorialMutation,
} from "@/store/api/tutorials/tutorials-api";

import { useToast } from "@/components/ui/use-toast";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { TString } from "@/store/api/common-api-types";
import { showApiToast } from "@/lib/toast/api-toast";

type UseTutorialFormArgs = {
  id?: TString;
  open?: boolean;
  onSuccessClose?: () => void;
};

export function useTutorialForm({
  id,
  open,
  onSuccessClose,
}: UseTutorialFormArgs) {
  const { toast } = useToast();

  const { data: tutorialRes, ...getTutorialApiState } = useGetATutorialQuery(
    { id: id! },
    { skip: !id || !open },
  );

  const tutorialData = tutorialRes?.data;

  const [createTutorial, createState] = useCreateTutorialsMutation();
  const [updateTutorial, updateState] = useUpdateTutorialMutation();

  const form = useForm<TTutorialFormData>({
    resolver: zodResolver(tutorialSchema),
    defaultValues: {
      title: "",
      type: "link",
      tutorialCategoryId: "",
      videoFile: undefined,
      videoFileUrl: null,
      thumbnail: undefined,
      sourceLink: "",
      description: "",
      isFeatured: true,
    },
  });

  useEffect(() => {
    if (id && tutorialData) {
      form.reset({
        title: tutorialData.title ?? "",
        type: tutorialData.type ?? "link",
        tutorialCategoryId: String(tutorialData.tutorialCategoryId ?? ""),
        videoFile: undefined,
        videoFileUrl: tutorialData.videoMedia?.url ?? null,
        thumbnail: undefined,
        sourceLink: tutorialData.sourceLink ?? "",
        description: tutorialData.description ?? "",
        isFeatured: tutorialData.isFeatured ?? true,
      });
    }
  }, [tutorialData, id, form]);

  const onSubmit = async (data: TTutorialFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const formData = new FormData();

      formData.append("tutorialCategoryId", data.tutorialCategoryId);
      formData.append("title", data.title);
      formData.append("type", data.type);
      formData.append("isFeatured", String(data.isFeatured));

      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (data.description) {
        formData.append("description", data.description);
      }

      if (data.type === "file" && data.videoFile instanceof File) {
        formData.append("videoFile", data.videoFile);
      }

      if (data.type === "link" && data.sourceLink) {
        formData.append("sourceLink", data.sourceLink);
      }

      if (id) {
        const response = await updateTutorial({ id, body: formData }).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: `The tutorial "${
            (data.title?.length ?? 0) > 50
              ? data.title?.substring(0, 50) + "..."
              : (data.title ?? "Untitled")
          }" has been updated successfully.`,
        });
      } else {
        const response = await createTutorial(formData).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: `The tutorial "${
            (data.title?.length ?? 0) > 50
              ? data.title?.substring(0, 50) + "..."
              : (data.title ?? "Untitled")
          }" has been added successfully.`,
        });
      }

      form.reset();
      onSuccessClose?.();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update tutorial.",
      });
    }
  };

  return {
    ...form,
    onSubmit,
    isLoading: id ? updateState.isLoading : createState.isLoading,
    getTutorialApiState,
    tutorialData,
  };
}
