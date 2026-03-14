"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  useCreateReferralLevelsMutation,
  useDeleteAReferralLevelsMutation,
  useGetReferralLevelsQuery,
  useUpdateAReferralLevelsMutation,
} from "@/store/api/referral-levels/referral-levels-api";
import { useToast } from "@/components/ui/use-toast";
import { FormValues } from "./types";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyRowErrors } from "./applyRowApiErrors";
import { showApiToast } from "@/lib/toast/api-toast";

export function useRepeatUpForm() {
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const pendingActionRef = useRef<(() => void) | null>(null);

  /** edit tracking */
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dirtyIndex, setDirtyIndex] = useState<number | null>(null);

  /** api calls */
  const [updateReferralLevel, updateState] = useUpdateAReferralLevelsMutation();
  const [createReferralLevels, createState] = useCreateReferralLevelsMutation();
  const [deleteReferralLevels] = useDeleteAReferralLevelsMutation();

  const { data, isLoading } = useGetReferralLevelsQuery({
    limit: 200,
    sortBy: "createdAt",
    sortOrder: "asc",
  });

  /** form */
  const form = useForm<FormValues>({
    defaultValues: { items: [] },
  });

  const { control, reset, setError, getValues } = form;

  const fieldArray = useFieldArray({
    control,
    name: "items",
  });

  const hasNewItem = fieldArray.fields.some((f) => f.isNew);

  /** load data */
  useEffect(() => {
    if (!isLoading && data?.data?.items?.length) {
      reset({
        items: data.data.items.map((item) => ({
          apiId: item.id,
          levelName: item.levelName,
          levelNumber: Number(item.levelNumber),
          referralBonusPercentage: Number(item.referralBonusPercentage),
          isNew: false,
        })),
      });
    }
  }, [data, isLoading, reset]);

  // ------------------------
  // EDIT ACTIONS
  // ------------------------

  const startEdit = (nextIndex: number) => {
    // Block editing if a new row exists
    if (hasNewItem) {
      toast({
        variant: "default",
        title: "Action Required",
        description: "Please submit or remove the new referral level first.",
      });
      return;
    }

    if (
      editingIndex !== null &&
      editingIndex !== nextIndex &&
      dirtyIndex === editingIndex
    ) {
      pendingActionRef.current = () => {
        if (editingIndex === null) return;

        form.resetField(`items.${editingIndex}`);
        setDirtyIndex(null);
        setEditingIndex(nextIndex);
      };

      setOpenDialog(true);
      return;
    }

    setEditingIndex(nextIndex);
  };

  // ------------------------
  // CANCEL EDITING ROW
  // ------------------------
  const cancelEdit = () => {
    if (editingIndex === null) return;

    const isNew = fieldArray.fields[editingIndex]?.isNew;

    if (isNew) {
      fieldArray.remove(editingIndex);
    } else {
      form.resetField(`items.${editingIndex}`);
    }

    setEditingIndex(null);
    setDirtyIndex(null);
  };

  // ------------------------
  // DELETE ROW
  // ------------------------
  const startDelete = async (apiId?: string) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete the referral levels",
    });
    try {
      await deleteReferralLevels({ id: apiId }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Referral level deleted successfully",
      });
    } catch (error) {
      console.error("Delete failed:", error);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Failed to delete",
        description: getApiMessage(error),
      });
    }
  };

  const markDirty = (index: number) => {
    if (editingIndex === index || fieldArray.fields[index]?.isNew) {
      setDirtyIndex(index);
    }
  };

  const confirmDiscardIfDirty = (onConfirm: () => void) => {
    if (editingIndex !== null && dirtyIndex === editingIndex) {
      pendingActionRef.current = () => {
        form.resetField(`items.${editingIndex}`);
        setEditingIndex(null);
        setDirtyIndex(null);
        onConfirm();
      };

      setOpenDialog(true);
      return;
    }

    onConfirm();
  };

  const removeRow = (index: number) => {
    fieldArray.remove(index);

    if (dirtyIndex !== null) {
      setDirtyIndex(null);
    }

    setEditingIndex(null);
  };

  // ------------------------
  // SAVE ROW
  // ------------------------

  const saveRow = async (index: number, apiId?: string) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });

    try {
      const response = await updateReferralLevel({
        id: apiId,
        body: {
          levelNumber: Number(getValues(`items.${index}.levelNumber`)),
          referralBonusPercentage: Number(
            getValues(`items.${index}.referralBonusPercentage`)
          ),
        },
      }).unwrap();

      setEditingIndex(null);
      setDirtyIndex(null);
      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: `Referral level-${Number(
          getValues(`items.${index}.levelNumber`)
        )} updated.`,
      });
    } catch (error) {
      applyRowErrors(getFieldErrors(error), index, setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update Referral Level",
      });
    }
  };

  // ------------------------
  // SUBMIT NEW
  // ------------------------

  const submitNew: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });

    const newIndex = data.items.findIndex((i) => i.isNew);
    if (newIndex === -1) return;

    try {
      const response = await createReferralLevels({
        levelNumber: Number(data.items[newIndex].levelNumber),
        referralBonusPercentage: Number(
          data.items[newIndex].referralBonusPercentage
        ),
      }).unwrap();

      reset();
      setEditingIndex(null);
      setDirtyIndex(null);

      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: `Level ${data.items[newIndex].levelNumber} added successfully.`,
      });
    } catch (error) {
      applyRowErrors(getFieldErrors(error), newIndex, setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add Referral Level",
      });
    }
  };

  return {
    form,
    fieldArray,
    editingIndex,
    hasNewItem,
    dirtyIndex,
    removeRow,
    startEdit,
    startDelete,
    cancelEdit,
    markDirty,
    confirmDiscardIfDirty,
    saveRow,
    submitNew,
    isUpdating: updateState.isLoading,
    isCreating: createState.isLoading,
    openDialog,
    setOpenDialog,
    pendingActionRef,
  };
}
