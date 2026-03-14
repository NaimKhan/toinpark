"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addCategorySchema,
  TAddCategoryFormData,
} from "../CategoryForm/CategorySchema";

import {
  useCreateTutorialCategoryMutation,
  useUpdateTutorialCategoryMutation,
  useGetATutorialCategoryQuery,
} from "@/store/api/tutorial-categories/tutorial-categories-api";

import { useToast } from "@/components/ui/use-toast";
import { TString } from "@/store/api/common-api-types";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";

type UseCategoryFormArgs = {
  id?: TString;
  open?: boolean;
  onSuccessClose?: () => void;
};

export function useCategoryForm({
  id,
  open,
  onSuccessClose,
}: UseCategoryFormArgs) {
  const { toast } = useToast();

  const { data: getOneRes, ...getOneApiState } = useGetATutorialCategoryQuery(
    { id: id! },
    { skip: !id || !open }
  );

  const categoryData = getOneRes?.data;

  // Mutations
  const [createCategory, createState] = useCreateTutorialCategoryMutation();
  const [updateCategory, updateState] = useUpdateTutorialCategoryMutation();

  // Form setup
  const form = useForm<TAddCategoryFormData>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  // Fill data on edit
  useEffect(() => {
    if (id && categoryData) {
      form.reset({
        name: categoryData.name ?? "",
        description: categoryData.description ?? "",
        isActive: categoryData.isActive ?? true,
      });
    }
  }, [categoryData, id, form]);

  const onSubmit = async (data: TAddCategoryFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const payload = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
      };

      if (id) {
        const response = await updateCategory({ id, body: payload }).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Your changes have been saved.",
        });
      } else {
        const response = await createCategory(payload).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "The new category has been added.",
        });
      }

      form.reset();
      onSuccessClose?.();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        title: "Error",
        description: getApiMessage(error) || "Failed to update category.",
        variant: "error",
      });
    }
  };

  return {
    ...form,
    onSubmit,
    isLoading: id ? updateState.isLoading : createState.isLoading,
    getOneApiState,
    categoryData,
  };
}
