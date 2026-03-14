"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateATicketCategoryMutation,
  useGetATicketCategoryQuery,
  useUpdateATicketCategoryMutation,
} from "@/store/api/tickets-categories/tickets-categories-api";
import { TCreateTicketCategories } from "@/store/api/tickets-categories/tickets-categories.types";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { useToast } from "@/components/ui/use-toast";
import {
  TicketCategorySchema,
  TTicketCategoryForm,
} from "./ticketCategorySchema";
import { TString } from "@/store/api/common-api-types";

type UseTicketCategoryArgs = {
  ticketId?: TString;
  open?: boolean;
  onSuccess?: () => void;
};

export function useTicketCategory({
  ticketId,
  open,
  onSuccess,
}: UseTicketCategoryArgs) {
  const { toast } = useToast();

  const isEdit = Boolean(ticketId);

  const form = useForm<TTicketCategoryForm>({
    resolver: zodResolver(TicketCategorySchema),
    defaultValues: { name: "" },
  });

  const [createCategory, createState] = useCreateATicketCategoryMutation();

  const [updateCategory, updateState] = useUpdateATicketCategoryMutation();

  const { data, isLoading: isFetching } = useGetATicketCategoryQuery(
    { id: ticketId! },
    {
      skip: !isEdit || !open,
    }
  );

  useEffect(() => {
    if (isEdit && data?.data) {
      form.reset({
        name: data.data.name || "",
      });
    }
  }, [isEdit, data, form]);

  const onSubmit = async (values: TTicketCategoryForm) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });

    try {
      const payload: TCreateTicketCategories = {
        name: values.name,
      };

      if (isEdit) {
        await updateCategory({
          id: ticketId!,
          body: payload,
        }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: isEdit
          ? "Category updated successfully."
          : "Category created successfully.",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Something went wrong.",
      });
    }
  };

  return {
    form,
    onSubmit,
    isLoading: createState.isLoading || updateState.isLoading || isFetching,
  };
}
