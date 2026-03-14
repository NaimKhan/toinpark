"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAirdropEventModalSchema,
  TAddAirdropEventFormData,
} from "./addAirdropEventModalSchema";
import {
  useCreateAirdropEventMutation,
  useGetAAirdropEventQuery,
  useUpdateAirdropEventMutation,
} from "@/store/api/airdrop-events/airdrop-events-api";
import { TCreateAirdropEvent } from "@/store/api/airdrop-events/airdrop-events.type";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { TString } from "@/store/api/common-api-types";
import { showApiToast } from "@/lib/toast/api-toast";

type UseAirdropFormProps = {
  airdropEventId?: TString;
};

export function useAirdropForm({ airdropEventId }: UseAirdropFormProps = {}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: getAirdropRes, ...getAAirdropEventApiState } =
    useGetAAirdropEventQuery(
      { id: airdropEventId! },
      { skip: !airdropEventId || !open },
    );

  const airdropData = getAirdropRes?.data;

  const [createAirdrop, { isLoading: isCreating }] =
    useCreateAirdropEventMutation();
  const [updateAirdrop, { isLoading: isUpdating }] =
    useUpdateAirdropEventMutation();

  const form = useForm<TAddAirdropEventFormData>({
    resolver: zodResolver(addAirdropEventModalSchema),
    defaultValues: {
      eventName: "",
      totalAmount: 0,
      usdConversionRate: 1,
      eventStartDate: new Date(),
      eventEndDate: new Date(),
    },
  });

  const { reset, setError } = form;

  useEffect(() => {
    if (airdropEventId && airdropData) {
      reset({
        eventName: airdropData.eventName ?? "",
        totalAmount: airdropData.totalAmount ?? 0,
        usdConversionRate: 1,
        eventStartDate: new Date(airdropData.eventStartDate ?? ""),
        eventEndDate: new Date(airdropData.eventEndDate ?? ""),
      });
    }
  }, [airdropEventId, airdropData, reset]);

  const onSubmit = async (data: TAddAirdropEventFormData) => {
    const toastId = toast({
      variant: "loading",
      title: `Loading...`,
      description: "Please wait while we apply your changes.",
    });
    try {
      const formData: TCreateAirdropEvent = {
        eventName: data.eventName,
        totalAmount: data.totalAmount,
        usdConversionRate: data.usdConversionRate,
        eventStartDate: data.eventStartDate
          ? new Date(data.eventStartDate).toISOString()
          : null,
        eventEndDate: data.eventEndDate
          ? new Date(data.eventEndDate).toISOString()
          : null,
      };

      if (airdropEventId) {
        const response = await updateAirdrop({
          id: airdropEventId,
          body: formData,
        }).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Airdrop event updated successfully.",
        });
      } else {
        const response = await createAirdrop(formData).unwrap();
        showApiToast({
          toastId: toastId.id,
          response,
          title: "Success",
          description: "Airdrop event created successfully.",
        });
      }

      reset();
      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, setError);
      toastId.update({
        id: toastId.id,
        title: "Error",
        description:
          getApiMessage(error) ||
          `${
            airdropEventId
              ? "Airdrop Event Update Failed"
              : "Airdrop Event Add Failed"
          }`,
        variant: "error",
      });
    }
  };

  const handleConfirm = () => form.handleSubmit(onSubmit, () => {})();

  return {
    form,
    open,
    setOpen,
    onSubmit,
    handleConfirm,
    getAAirdropEventApiState,
    airdropData,
    isEditMode: !!airdropEventId,
    isCreating,
    isUpdating,
  };
}
